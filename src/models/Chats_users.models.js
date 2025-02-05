const {Model}=require('objection');

class Chats_users extends Model{

    static get tableName(){
        return 'chats_users';
    }

    static get idColumn(){
        return 'chats_users_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['chat_id','user_id'],
            properties:{
                chats_users_id:{type:'integer'},
                chat_id:{type:'integer'},
                user_id:{type:'integer'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        }
    }
}

module.exports=Chats_users;