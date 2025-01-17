const authService=require('./auth_users.service');

module.exports.loginUser=async(req,res,next)=>{
    try{
        const {identifier,password}=req.body;
        const result=await authService.login(identifier,password);
        if(result===null){
            return res.status(401).json({message:"Invalid credentials",bool:false});
        }
        const {token,refresh,username,email,id}=result;
        return res.status(200).json({message:"Login successful",bool:true,token,refresh,username,email,id});
    }
    catch(err){
        next(err);
    }

}


module.exports.register=async(req,res,next)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        if(await authService.userExists(email)===true){
           return res.status(204).json({message:"user already exists",bool:false});
        }
        const username=await authService.register(firstName,lastName,email,password);
        return res.status(201).json({message:"User created successfully",bool:true,username});
    }
    catch(err){
        next(err);
    }
}

// module.exports.verifyToken=async(req,res,next)=>{
//   try{
//     res.json({message:"verified",bool:true});
//   }
//   catch(err){
//     next(err)
//   }
// }