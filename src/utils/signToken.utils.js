const jwt=require('jsonwebtoken');

module.exports.signToken=(id,username)=>{
    const token=jwt.sign({id,username},
                         process.env.SECRET_KEY_TOKEN,
                         {expiresIn: process.env.TOKEN_TIME});
    return token;
}

module.exports.signRefresh=(id,username)=>{
    const refresh=jwt.sign({id,username},
        process.env.SECRET_KEY_REFRESH,
        {expiresIn: process.env.REFRESH_TIME});
    return refresh;
}
