const jwt=require('jsonwebtoken');
const { encrypt } = require('./crypt');

module.exports.signToken=(id,username)=>{
    const payload=encrypt({id,username});
    const token=jwt.sign({'enc':payload},
                         process.env.SECRET_KEY_TOKEN,
                         {expiresIn: process.env.TOKEN_TIME});
    return token;
}

module.exports.signRefresh=(id,username)=>{
    const payload=encrypt({id,username});
    const refresh=jwt.sign({'enc':payload},
        process.env.SECRET_KEY_REFRESH,
        {expiresIn: process.env.REFRESH_TIME});
    return refresh;
}
