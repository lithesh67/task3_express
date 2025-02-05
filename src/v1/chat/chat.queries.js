const Chats = require('../../models/Chats.models');
const Chats_users = require('../../models/Chats_users.models');
const Users = require('../../models/Users.model');
const knex=require('../../mysql/db');


module.exports=class chatQueries{

    static async getAllUsers(userid){
        try{
            const result=await Users.query(knex).select(['id','username','profile_pic']).where('id','!=',userid);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async createChat(userid,receiver_id){
        const trx=await knex.transaction();
        try{
            const insertedChat=await Chats.query(trx).insert({is_group:'0'});
            await Chats_users.query(trx).insert({chat_id:insertedChat.chat_id,user_id:userid});
            await Chats_users.query(trx).insert({chat_id:insertedChat.chat_id,user_id:receiver_id});
            trx.commit();
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async getExistingChats(userid){
        const trx=await knex.transaction();
        try{
           const result=await Chats_users.query(trx).select(['chat_id']).where('user_id','=',userid);
           result.forEach(async(chat,i)=>{
             let temp=await Chats_users.query(trx).select(['cu.user_id','u.username'])
                                                         .from('chats_users as cu')
                                                         .join('users  as u','cu.user_id','u.id')
                                                         .where('cu.chat_id','=',chat.chat_id)
                                                         .where('cu.user_id','!=',userid);
             console.log(temp);
             
           });
           return [];
        }
        catch(err){
            throw errl
        }
    }

}