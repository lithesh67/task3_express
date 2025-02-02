const notificationQueries = require("./notifications.queries");


module.exports=class notificationService{

    static async getNotifications(userid){
       try{
        return await notificationQueries.getNotifications(userid);
       }
       catch(err){
        throw err;
       }
    }
}