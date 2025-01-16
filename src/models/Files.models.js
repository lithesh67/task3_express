const {Model}=require('objection');

class Files extends Model{

    static get tableName(){
        return 'files';
    }

    static get idColumn(){
        return 'file_id';
    }
}

module.exports=Files;