const chatService = require("./chat.service");


module.exports.getAllUsers=async(req,res,next)=>{
    try{
       const userid=req.userid;
       const result=await chatService.getAllUsers(userid);
       return res.status(200).json({result});
    }
    catch(err){
        next(err);
    }
}

module.exports.createChat=async(req,res,next)=>{
    try{
        const userid=req.userid;
        const {receiver_id}=req.body;
        await chatService.createChat(userid,receiver_id);
        return res.status(201).json({message:"Chat for the user created"});
    }
    catch(err){
        next(err);
    }
}

module.exports.getExistingChats=async(req,res,next)=>{
    try{
        const userid=req.userid;
        const result=await chatService.getExistingChats(userid);
    }
    catch(err){
        next(err);
    }
}