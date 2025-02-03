const notificationService = require("./notifications.service");

module.exports.getNotifications=async(req,res,next)=>{
   try{
     const userid=req.userid;
     const result=await notificationService.getNotifications(userid);
     return res.status(200).json({result});
   }
   catch(err){
    next(err);
   }
}

module.exports.markRead=async(req,res,next)=>{
  try{
     const {notification_id}=req.body;
     await notificationService.markRead(notification_id);
     return res.status(200).json({message:"Marked as read"});
  }
  catch(err){
    next(err);
  }
}