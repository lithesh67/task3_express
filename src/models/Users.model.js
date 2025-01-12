const {Model}=require('objection');

class Users extends Model{
    static get tableName(){
        return 'users';
    }

    static get idColumn(){
        return 'id';
    }

    // static get jsonSchema(){
    //     return{
    //         type:'object',
    //         required:['first_name','last_name','password','email'],
    //         properties:{
    //             id:{type:'integer'},
    //             first_name:{type:'string'},
    //             last_name:{type:'string'},
    //             username:{type:'string'},
    //             password:{type:'string'},
    //             email:{type:'string'},
    //             profile_pic:{type:'string'},
    //             thumbnail:{type:'string'},
    //             status:{type:'string'},
    //             created_at: { type: 'string', format: 'date-time' },
    //             updated_at: { type: 'string', format: 'date-time' }

    //         }
    //     }
    // }
    


}



module.exports=Users;