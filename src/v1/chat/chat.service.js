const chatQueries = require("./chat.queries");



module.exports=class chatService{
    
    static async getAllUsers(userid){
        try{
          return await chatQueries.getAllUsers(userid);
        }
        catch(err){
            throw err;
        }
    }

    static async createChat(userid,receiver_id,receiver_name){
        try{
            return await chatQueries.createChat(userid,receiver_id,receiver_name);
        }
        catch(err){
            throw err;
        }
    }

    static async getExistingChats(userid){
        try{
            return await chatQueries.getExistingChats(userid);
        }
        catch(err){
            throw err;
        }
    }

    static async getUserChat(chat_id){
        try{
            return await chatQueries.getUserChat(chat_id);
        }
        catch(err){
            throw err;
        }
    }

    static async insertMessage(message,user_id,chat_id){
        try{
            await chatQueries.insertMessage(message,user_id,chat_id);
        }
        catch(err){
            throw err;
        }
    }

    static async groupExists(group_name){
        try{
            const result=await chatQueries.groupExists(group_name);
            if(result.length!=0){
                return true;
            }
            return false;
        }
        catch(err){
            throw err;
        }
    }

    static async createGroup(group_name,participants){
        try{
            return await chatQueries.createGroup(group_name,participants);
        }
        catch(err){
            throw err;
        }
    }
}

