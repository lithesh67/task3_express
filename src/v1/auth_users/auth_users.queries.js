const Users=require('../../models/Users.model');
const knex=require('../../mysql/db');

module.exports=class authDB{
    static async userExists(email){
        try{
            return await Users.query(knex).select('email').from('users').where('email','=',email);
        }
        catch(err){
            throw err;
        }
    }


    static async login(user){
        try{
            const dbData=await Users.query(knex).select('username','id','password','email').from('users').where('email','=',user).orWhere('username','=',user);
            return dbData[0];
        }
        catch(err){
            throw err;
        }
    }

    static async insertUser(obj){
        try{
            const inserted=await Users.query(knex).insert(obj);
            const username=obj.first_name+inserted.id;
            console.log(username);
            
            await Users.query(knex).where('id','=',inserted.id).update({username:username});
            return username; 
        }
        catch(err){
            throw err;
        }
    }

}