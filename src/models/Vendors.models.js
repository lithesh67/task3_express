const {Model}=require('objection');

class Vendors extends Model{

    static get tableName(){
        return 'vendors';
    }

    static get idColumn(){
        return 'vendor_id';
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['vendor_name','contact_name','address','city','postal_code','country','phone'],
            properties:{
                vendor_id:{type:'integer'},
                vendor_name:{type:'string'},
                contact_name:{type:'string'},
                address:{type:'string'},
                city:{type:'string'},
                postal_code:{type:'string'},
                country:{type:'string'},
                phone:{type:'string'},
                status:{type:'string'},
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }

            } 
        }
    }

}

module.exports=Vendors;