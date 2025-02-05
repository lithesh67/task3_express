const {Model}=require('objection');

class Chats extends Model{

    static get tableName(){
        return 'chats';
    }

    static get idColumn(){
        return 'chat_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['is_group'],
            properties:{
                chat_id:{type:'integer'},
                is_group:{type:'string'},
                group_name:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        }
    }
}

module.exports=Chats;