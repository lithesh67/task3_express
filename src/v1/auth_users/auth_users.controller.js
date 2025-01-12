const authService=require('./auth_users.service');

module.exports.loginUser=async(req,res,next)=>{
    try{
        const {user,password}=req.body;
        const result=await authService.login(user,password);
        if(result===null){
            throw new Error("Invalid credentials");
        }
        const {token,refresh}=result;
        return res.json({message:"Login successful",bool:true,token,refresh});
    }
    catch(err){
        next(err);
    }

}


module.exports.register=async(req,res)=>{
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