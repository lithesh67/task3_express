const dashboardService = require("./dashboard.service");


module.exports.getProducts=async(req,res,next)=>{
    try{
        page=parseInt(req.query.page);
        limit=parseInt(req.query.limit);
        const {result,count}=await dashboardService.getProducts(page,limit);
        res.json({message:"retrieved successfully",bool:true,tableData:result,count:count[0].count});
    }
    catch(err){
        next(err);
    }
}

module.exports.getFiles=async(req,res,next)=>{
    try{
      const userid=req.userid;
      const fileData=await dashboardService.getFiles(userid);
      res.json({fileData});
    }
    catch(err){
        next(err);
    }
}

module.exports.userDetails=async(req,res,next)=>{
    try{
        const userid=req.userid;
        const result=await dashboardService.userDetails(userid);
        res.json({profile_pic:result[0].profile_pic});
        
    }
    catch(err){
        next(err);
    }
}

module.exports.getCategories_vendors=async(req,res,next)=>{
    try{
        const {categories,vendors}=await dashboardService.getCategories_vendors();
        res.json({categories,vendors});
    }
    catch(err){
        next(err);
    }
}

module.exports.addProduct=async(req,res,next)=>{
    try{
        const {productName,vendor,category,quantity,measure,price}=req.body;
        const result=await dashboardService.addProduct(productName,vendor,category,quantity,measure,price);
        console.log(result);
        
        
    }
    catch(err){
        next(err);
    }
}