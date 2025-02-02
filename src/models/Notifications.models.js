const {Model}=require('objection');

class Notifications extends Model{
    static get tableName(){
       return 'notifications';
    }

    static get idColumn(){
        return 'notification_id';
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['notification_title','user_id','message','notification_title'],
            properties:{
                notification_id:{type:'integer'},
                notification_title:{type:'string'},
                message:{type:'string'},
                user_id:{type:'integer'},
                is_read:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        }
    }

}

module.exports=Notifications;