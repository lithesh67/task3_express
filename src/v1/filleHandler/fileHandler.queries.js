const Users=require('../../models/Users.model');
const Files=require('../../models/Files.models');
const Products=require('../../models/Products.model');
const knex=require('../../mysql/db');

module.exports=class fileQueries{

    static async updateProfile(profile_url,user_id){
       try{
          const result=await Users.query(knex).patch({'profile_pic':profile_url}).where('id','=',user_id);
          // const result=await Users.query(knex).update({'profile_pic':profile_url}).where('id','=',user_id);
          return result;
        }
       catch(err){
         throw err;
       }
    }

    static async uploadFile(fileName,url,fileType,fileSize,userid,purpose){
      try{
        const result=await Files.query(knex).insert({
          file_name:fileName,
          user_id:userid,
          file_type:fileType,
          file_name:fileName,
          file_path:url,
          file_size:fileSize,
          purpose:purpose
        });
        return result;
      }
      catch(err){
        throw err;
      }
    }

    static async productImage(url,product_id){
      try{
        return await Products.query(knex).patch({product_image:url}).where('product_id','=',product_id);
      }
      catch(err){
        throw err;
      }
    }

    static async storeThumbnail(url,user_id){
      try{
        return await Users.query(knex).patch({'thumbnail':url}).where('id','=',user_id);
      }
      catch(err){
        throw err;
      }
    }

    static async getImportedFiles(user_id){
      try{
         return await Files.query(knex).select(['file_name','status','error_file','file_id']).where('user_id','=',user_id)
                                       .where('purpose','=','1');
      }
      catch(err){
        throw err;
      }
    }

  }