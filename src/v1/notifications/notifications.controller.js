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