const jwt=require('jsonwebtoken');
const { signToken } = require('../../utils/signToken.utils');
const { decrypt } = require('../../utils/crypt');
const { getRefresh } = require('../../v1/auth_users/auth_users.controller');

function validateAndSend(refresh,req){
    try{
    
        const result=jwt.verify(refresh,process.env.SECRET_KEY_REFRESH);
        decrypted_obj=JSON.parse(decrypt(result.enc));
        const newToken=signToken(decrypted_obj.id,decrypted_obj.username,decrypted_obj.role);
        req.userid=decrypted_obj.id;
        req.role=decrypted_obj.role;
        return newToken;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

function getUserid(token){
    try{
        const decoded=jwt.decode(token,process.env.SECRET_KEY_TOKEN);
        const decrypted_obj=JSON.parse(decrypt(decoded.enc)); 
        return decrypted_obj.id;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const validateToken=(req,res,next)=>{
    let token=req.headers.Authorization || req.headers.authorization;
    let refresh=req.headers.refresh;  
    if (token && token.startsWith("Bearer")){
        token=token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY_TOKEN,async(err,decoded)=>{
            if(err instanceof  jwt.TokenExpiredError ){
                const userid=getUserid(token);
                refresh=await getRefresh(userid);
                const newToken=validateAndSend(refresh,req);
                if(newToken!=null){
                    console.log("new token generated");
                    res.setHeader("Authorization",newToken);
                    // res.setHeader('Cache-Control', 'no-store');
                    next();
                }
                else{
                    console.log("Invalid refresh");
                    return res.status(401).json({message:"Refresh token is also invalid",bool:false});
                }
            }
            else if(err){
                return res.status(401).json({message:"Invalid token",bool:false});
            }
            else{                
                const decrypted_obj=JSON.parse(decrypt(decoded.enc));
                req.userid=decrypted_obj.id;
                req.role=decrypted_obj.role;
                next();  
                console.log("after next()");
                      
            }
        });
    }
    else{
        res.json({message:"Token not found",bool:false});
    }
};

module.exports={validateToken};