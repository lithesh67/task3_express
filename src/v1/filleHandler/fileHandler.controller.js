const fileService = require("./fileHandler.service");


module.exports.uploadImage=async(req,res,next)=>{
    try{
       profile_url=req.body.url;
       user_id=req.userid;
       const result=await fileService.updateProfile(profile_url,user_id);
       res.json({message:"Updated profile picture",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.getUrl=async(req,res,next)=>{
    try{
       const fileType=req.query.fileType;
       const fileKey=req.query.fileKey;
       url=await fileService.getUrl(fileKey,fileType);
       res.json({url,bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.uploadFile=async(req,res,next)=>{
    try{
      const {fileName,url,fileType,fileSize}=req.body;
      const userid=req.userid;
      const result=await fileService.uploadFile(fileName,url,fileType,fileSize,userid);
      res.json({message:"uploaded the file",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.productImage=async(req,res,next)=>{
    try{
        const {url,product_id}=req.body;
        const result=await fileService.productImage(url,product_id);
        res.json({message:"stored the product image",bool:true});
    }
    catch(err){
       next(err);
    }
}