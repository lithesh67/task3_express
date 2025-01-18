const {Model}=require('objection');

class Products extends Model{
    static get tableName(){
        return 'products';
    }

    static get idColumn(){
        return 'product_id';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['product_name','category_id','quantity_in_stock','measure','unit_price'],
            properties:{
                product_id:{type:'integer'},
                product_name:{type:'string'},
                category_id:{type:['integer','string']},
                quantity_in_stock:{type:['integer','string']},
                measure:{type:['integer','string']},
                product_image:{type:'string'},
                status:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }

            } 
        }
    }
}

module.exports=Products;