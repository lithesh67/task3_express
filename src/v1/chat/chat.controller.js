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
        const {receiver_id,receiver_name}=req.body;
        const chat_id=await chatService.createChat(userid,receiver_id,receiver_name);
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

module.exports.insertMessage=async(message,chat_id,sender_id)=>{
    try{
       await chatService.insertMessage(message,chat_id,sender_id);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.createGroup=async(req,res,next)=>{
    try{
        const {group_name}=req.body;
        const userid=req.userid;
        const participants=[];
        participants.push(userid);
        const exists=await chatService.groupExists(group_name);
        if(exists){
            return res.status(409).json({message:"Group already exists"});
        }
        const chat_id=await chatService.createGroup(group_name,participants);
        return res.status(200).json({chat_id:chat_id,creator_id:userid});
    }
    catch(err){
        next(err);
    }
}

module.exports.joinGroup=async(req,res,next)=>{
    try{
        
    }
    catch(err){
        next(err);
    }
}