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

    static async createChat(userid,receiver_id,){
        try{
            await chatQueries.createChat(userid,receiver_id);
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
}

