const {Model}=require('objection');

class Categories extends Model{

    static get tableName(){
        return 'categories';
    }

    static get idColumn(){
        return 'category_id';
    }

}

module.exports=Categories;