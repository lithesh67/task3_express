const Notifications = require("../../models/Notifications.models");
const knex=require('../../mysql/db');

module.exports=class notificationQueries{
    
    static async getNotifications(userid){
        try{
           return await Notifications.query(knex).select(['notification_id','user_id','is_read','notification_title','message'])
                                                 .where('user_id','=',userid).orderBy('created_at','desc');
        }
        catch(err){
            throw err;
        }
    }

    static async markRead(notification_id){
        try{
            await Notifications.query(knex).patch({is_read:'1'}).where('notification_id','=',notification_id);
        }
        catch(err){
            throw err;
        }
    }
}