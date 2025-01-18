const { uploadImageSchema, getUrlSchema, uploadFileSchema, productImageSchema } = require("./dto/fileHandler.joi");
const fileService = require("./fileHandler.service");


module.exports.uploadImage=async(req,res,next)=>{
    const profile_url=req.body.url;
    const user_id=req.userid;
    const {error}=uploadImageSchema.validate({
        profile_url,user_id
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});  
    }
    try{
       const result=await fileService.updateProfile(profile_url,user_id);
       res.status(200).json({message:"Updated profile picture",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.getUrl=async(req,res,next)=>{
    const fileType=req.query.fileType;
    const fileKey=req.query.fileKey;
    const {error}=getUrlSchema.validate({
        fileType,fileKey
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});   
    }
    try{
       url=await fileService.getUrl(fileKey,fileType);
       res.status(200).json({url,bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.uploadFile=async(req,res,next)=>{
    const {fileName,url,fileType,fileSize}=req.body;
    const {error}=uploadFileSchema.validate({
        fileName,url,fileType,fileSize
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});  
    }
    try{
      const userid=req.userid;
      const result=await fileService.uploadFile(fileName,url,fileType,fileSize,userid);
      res.status(200).json({message:"uploaded the file",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.productImage=async(req,res,next)=>{
    const {url,product_id}=req.body;
    const {error}=productImageSchema.validate({
        url,product_id
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});   
    }
    try{
        const result=await fileService.productImage(url,product_id);
        res.status(200).json({message:"stored the product image",bool:true});
    }
    catch(err){
       next(err);
    }
}