const Users=require('../../models/Users.model');
const Files=require('../../models/Files.models');
const knex=require('../../mysql/db');

module.exports=class fileQueries{

    static async updateProfile(profile_url,user_id){
       try{
          const result=await Users.query(knex).update({'profile_pic':profile_url}).where('id','=',user_id);
          return result;
        }
       catch(err){
         throw err;
       }
    }

    static async uploadFile(fileName,url,fileType,fileSize,userid){
      try{
        const result=await Files.query(knex).insert({
          file_name:fileName,
          user_id:userid,
          file_type:fileType,
          file_name:fileName,
          file_path:url,
          file_size:fileSize
        });
        return result;
      }
      catch(err){
        throw err;
      }
    }
}