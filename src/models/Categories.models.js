const {Model}=require('objection');

class Categories extends Model{

    static get tableName(){
        return 'categories';
    }

    static get idColumn(){
        return 'category_id';
    }


    static get jsonSchema(){
        return{
            type:'object',
            required:['category','description'],
            properties:{
                category_id:{type:'integer'},
                category:{type:'string'},
                description:{type:'string'},
                status:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }

            }
        }
    }
 }




module.exports=Categories;