const jwt=require('jsonwebtoken');
const { encrypt } = require('./crypt');

module.exports.signToken=(id,username,role)=>{
    const payload=encrypt({id,username,role});
    const token=jwt.sign({'enc':payload},
                         process.env.SECRET_KEY_TOKEN,
                         {expiresIn: process.env.TOKEN_TIME});
    return token;
}

module.exports.signRefresh=(id,username,role)=>{
    const payload=encrypt({id,username,role});
    const refresh=jwt.sign({'enc':payload},
        process.env.SECRET_KEY_REFRESH,
        {expiresIn: process.env.REFRESH_TIME});
    return refresh;
}
