const Files=require('../../models/Files.models');
const knex=require('../../mysql/db');

module.exports=class scheduledQueries{
    static async getUnprocessedFile(){
        try{
            const files=await Files.query(knex).select(['user_id','file_id','file_path','file_name']).where('purpose','=','1').where('status','=','0').limit(1);
            return files;
        }
        catch(err){
            throw err;
        }
    }

    static async storeTheErrorUrl(error_url,file_id){
        try{
            await Files.query(knex).patch({error_file:error_url}).where('file_id','=',file_id);
        }
        catch(err){
            throw err;
        }
    }
}