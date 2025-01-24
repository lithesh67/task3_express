const { getPreSignedUrl, s3 } = require("../../aws/s3/s3Files");
const sharp=require('sharp');
const fileQueries = require("./fileHandler.queries");

module.exports=class fileService{

    static async getUrl(fileKey,fileType){
        try{
           return await getPreSignedUrl(process.env.aws_BUCKET_NAME,fileKey,fileType);
        }
        catch(err){
            throw err;
        }
    }

    static async updateProfile(profile_url,user_id){
        try{
            return await fileQueries.updateProfile(profile_url,user_id);
        }
        catch(err){
            throw err;
        }
    }

    static async uploadFile(fileName,url,fileType,fileSize,userid){
        try{
            return await fileQueries.uploadFile(fileName,url,fileType,fileSize,userid);
        }
        catch(err){
            throw err;
        }
    }

    static async productImage(url,product_id){
        try{
            return await fileQueries.productImage(url,product_id);
        }
        catch(err){
            throw err;
        }
    }

    static async compressImage(file,key_of_url,user_id){
        try{
            const compressedImage=await sharp(file.Body).resize(60,60,{fit:'contain',position:'center'}).toBuffer();
            const params={
              Bucket:process.env.aws_BUCKET_NAME,
              Key:key_of_url+'/thumbnail',
              ContentType:file.ContentType,
              Body:file.Body
            }
            await s3.putObject(params).promise();
            await fileQueries.storeThumbnail(key_of_url+'/thumbnail',user_id);
        }
        catch(err){
            throw err;
        }
       
    }

}

