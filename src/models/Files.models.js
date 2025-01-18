const {Model}=require('objection');

class Files extends Model{

    static get tableName(){
        return 'files';
    }

    static get idColumn(){
        return 'file_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['file_name','user_id','file_type','file_path','file_size'],
            properties:{
                file_id:{type:'integer'},
                file_name:{type:'string'},
                user_id:{type:'integer'},
                file_type:{type:'string'},
                file_path:{type:'string'},
                file_size:{type:['string','number'] },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }

            }
        }
    }
}

module.exports=Files;