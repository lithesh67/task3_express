const authService=require('./auth_users.service');

module.exports.loginUser=async(req,res,next)=>{
    try{
        const {identifier,password}=req.body;
        const result=await authService.login(identifier,password);
        if(result===null){
            return res.json({message:"Invalid credentials",bool:false});
        }
        const {token,refresh,username,email,id}=result;
        return res.json({message:"Login successful",bool:true,token,refresh,username,email,id});
    }
    catch(err){
        next(err);
    }

}


module.exports.register=async(req,res,next)=>{
    const {firstName,lastName,email,password}=req.body;
    try{
        if(await authService.userExists(email)===true){
           return res.json({message:"user already exists",bool:false});
        }
        const username=await authService.register(firstName,lastName,email,password);
        return res.json({message:"User created successfully",bool:true,username});
    }
    catch(err){
        next(err);
    }
}