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
        const chat_id=await chatService.createChat(userid,receiver_id);
        return res.status(201).json({chat_id});
    }
    catch(err){
        next(err);
    }
}

module.exports.getExistingChats=async(req,res,next)=>{
    try{
        const userid=req.userid;
        const result=await chatService.getExistingChats(userid);
        return res.status(200).json({result});
    }
    catch(err){
        next(err);
    }
}

module.exports.getUserChat=async(req,res,next)=>{
    try{
       const chat_id=req.query.chat_id;
       const result=await chatService.getUserChat(chat_id);
       return res.status(200).json({result});
    }
    catch(err){
        next(err);
    }
}

module.exports.insertMessage=async(data)=>{
    try{
       await chatService.insertMessage(data.message,data.userid,data.chat_id);
    }
    catch(err){
        console.log(err);
    }
}