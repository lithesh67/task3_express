const Chats = require('../../models/Chats.models');
const Chats_users = require('../../models/Chats_users.models');
const Messages = require('../../models/Messages.models');
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
            return insertedChat.chat_id;
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async getExistingChats(userid){
        try{
           const result=await Chats_users.query(knex).select(['chat_id']).where('user_id','=',userid);
           for(let i=0;i<result.length;i++){
             let chat=result[i];
             let temp=await Chats_users.query(knex).select(['cu.user_id','u.username'])
                                                         .from('chats_users as cu')
                                                         .join('users  as u','cu.user_id','u.id')
                                                         .where('cu.chat_id','=',chat.chat_id)
                                                         .where('cu.user_id','!=',userid);                             
             result[i]['user_id']=temp[0].user_id;
             result[i]['username']=temp[0].username;
           };
           return result;
        }
        catch(err){
            throw err;
        }
    }

    static async getUserChat(chat_id){
        try{
          const result=await Messages.query(knex).select(['message','sender_id']).where('chat_id','=',chat_id);
          return result;
        }
        catch(err){
            throw err;
        }
    }

    static async insertMessage(message,user_id,chat_id){
       try{
         await Messages.query(knex).insert({message:message,sender_id:user_id,chat_id:chat_id});
       }
       catch(err){
         throw err;
       }
    }

}