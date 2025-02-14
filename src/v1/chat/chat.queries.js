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

    static async createChat(userid,receiver_id,receiver_name){
        const trx=await knex.transaction();
        try{
            const insertedChat=await Chats.query(trx).insert({is_group:'0'});
            const senderQuery=await Users.query(trx).select(['username']).where('id','=',userid);
            const username=senderQuery[0].username;
            await Chats_users.query(trx).insert({chat_id:insertedChat.chat_id,user_id:userid,chat_name:receiver_name});
            await Chats_users.query(trx).insert({chat_id:insertedChat.chat_id,user_id:receiver_id,chat_name:username});
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
           const result=await Chats_users.query(knex).select(['u.id as user_id','cu.chat_id','cu.chat_name','c.is_group'])
                                                     .from('chats_users as cu')
                                                     .join('chats as c','cu.chat_id','c.chat_id')
                                                     .leftJoin('users as u','u.username','cu.chat_name')
                                                     .where('cu.user_id','=',userid);
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

    static async insertMessage(message,chat_id,sender_id){
       try{
         await Messages.query(knex).insert({message:message,sender_id:sender_id,chat_id:chat_id});
       }
       catch(err){
         throw err;
       }
    }

    static async groupExists(group_name){
        try{
           const result=await Chats.query(knex).select(['group_name']).where('group_name','=',group_name);
           return result;
        }
        catch(err){
            throw err;
        }
    }

    static async createGroup(group_name,participants){
        const trx=await knex.transaction();
        try{
           const insertedGroup=await Chats.query(trx).insert({is_group:'1',group_name:group_name});
           for(let i=0;i<participants.length;i++){
              await Chats_users.query(trx).insert({
                chat_id:insertedGroup.chat_id,
                user_id:participants[i],
                chat_name:group_name,
              });
           }
           trx.commit();
           return insertedGroup.chat_id;
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async joinGroupPersonally(chat_id,group_name,user_id){
       try{
          await Chats_users.query(knex).insert({chat_id:chat_id,chat_name:group_name,user_id:user_id});
       }
       catch(err){
        throw err;
       }
    }

    static async unjoinedGroups(userid){
        try{
            const result=await Chats.query(knex).select(['group_name','chat_id',]).where('is_group','=','1')
                                         .whereNotIn('chat_id',knex('chats_users').select('chat_id').where('user_id','=',userid));
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async getGroupsOfUser(userid){
        try{
           const result=await Chats.query(knex).select(['c.group_name']).from('chats as c')
                                         .join('chats_users as cu','cu.chat_name','c.group_name')
                                         .where('cu.user_id','=',userid);
           return result;
        }
        catch(err){
            throw err;
        }
    }

}