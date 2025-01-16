const {Model}=require('objection');

class Products_To_Vendors extends Model{
    static get tableName(){
        return 'products_to_vendors';
    }

    static get idColumn(){
        return 'products_to_vendors';
    }
}

module.exports=Products_To_Vendors;