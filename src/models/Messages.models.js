const {Model}=require('objection');

class Messages extends Model{

    static get tableName(){
        return 'messages';
    }

    static get idColumn(){
        return 'message_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['chat_id','sender_id','message'],
            properties:{
                message_id:{type:'integer'},
                chat_id:{type:'integer'},
                sender_id:{type:'integer'},
                message:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        }
    }
}

module.exports=Messages;