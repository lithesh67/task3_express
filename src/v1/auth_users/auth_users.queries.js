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
            const dbData=await Users.query(knex).select('username','id','password','email','role').from('users').where('email','=',user).orWhere('username','=',user);
            return dbData[0];
        }
        catch(err){
            throw err;
        }
    }

    static async insertUser(obj){
        const trx=await knex.transaction();
        try{
            const inserted=await Users.query(trx).insert(obj);
            const username=obj.first_name+inserted.id;
            console.log(username);
            await Users.query(trx).where('id','=',inserted.id).patch({username:username});
            await trx.commit();
            return username; 
        }
        catch(err){
            await trx.rollback();
            throw err;
        }
    }

    static async storeRefresh(user,refresh){
        try{
            await Users.query(knex).patch({refresh_token:refresh}).where('email','=',user).orWhere('username','=',user);
        }
        catch(err){
            throw err;
        }
    }

    static async getRefresh(userid){
        try{
            const result=await Users.query(knex).select(['refresh_token']).from('users').where('id','=',userid);
            return result[0].refresh_token;
        }
        catch(err){
            return null;
        }
    }

    static async resetPassword(email,hashed_password){
        const trx=await knex.transaction();
        try{
           await Users.query(trx).patch({reset_token:null}).where('email','=',email);
           await Users.query(trx).patch({password:hashed_password}).where('email','=',email);
           await trx.commit();
        }
        catch(err){
            await trx.rollback();
            throw err;
        }
    }

    static async storeResetToken(resetToken,email){
        try{
           await Users.query(knex).patch({reset_token:resetToken}).where('email','=',email);
        }
        catch(err){
            throw err;
        }
    }

    static async checkResetToken(token){
        try{
            const result=await Users.query(knex).select(['reset_token']).where('reset_token','=',token);
            return result;
        }
        catch(err){
            throw err;
        }
    }

}