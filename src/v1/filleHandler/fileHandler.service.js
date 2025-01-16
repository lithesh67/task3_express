const { getPreSignedUrl } = require("../../aws/s3/s3Files");
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

}

