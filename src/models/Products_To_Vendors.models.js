const {Model}=require('objection');

class Products_To_Vendors extends Model{
    static get tableName(){
        return 'products_to_vendors';
    }

    static get idColumn(){
        return 'products_to_vendors';
    }

    static get jsonSchema(){
        return{
            type:'object',
            required:['product_id','vendor_id'],
            properties:{
                products_to_vendors_id:{type:['string']},
                vendor_id:{type:['string','integer']},
                product_id:{type:['string','integer']},
                status:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }

            } 
        }
    }
}

module.exports=Products_To_Vendors;