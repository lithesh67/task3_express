const jwt=require('jsonwebtoken');
const { signToken } = require('../../utils/signToken.utils');

function validateAndSend(refresh,req){
    try{
        result=jwt.verify(refresh,process.env.SECRET_KEY_REFRESH);
        const newToken=signToken(result.id,result.username);
        req.userid=result.id;
        return newToken;
    }
    catch(err){
        return null;
    }
}

const validateToken=(req,res,next)=>{
    let token=req.headers.Authorization || req.headers.authorization;
    const refresh=req.headers.refresh;  
      
    if (token && token.startsWith("Bearer")){
        token=token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY_TOKEN,(err,decoded)=>{
            if(err instanceof jwt.TokenExpiredError){
                const newToken=validateAndSend(refresh,req);
                if(newToken!=null){
                    console.log("new token generated");
                    res.set("Authorization",newToken);
                    next();
                }
                else{
                    console.log("Invalid refresh");
                    return res.json({message:"Refresh token is also invalid",bool:false});
                }
            }
            else if(err){
                return res.json({message:"Invalid token",bool:false});
            }
            else{
                req.userid=decoded.id;
                next();
            }
        });
    }
    else{
        res.json({message:"Token not found",bool:false});
    }
};

module.exports={validateToken};