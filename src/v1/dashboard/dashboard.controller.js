const dashboardService = require("./dashboard.service");


module.exports.getProducts=async(req,res,next)=>{
    try{
        page=parseInt(req.query.page);
        limit=parseInt(req.query.limit);
        const {result,count}=await dashboardService.getProducts(page,limit);
        res.status(200).json({message:"retrieved successfully",bool:true,tableData:result,count:count[0].count});
    }
    catch(err){
        next(err);
    }
}

module.exports.getFiles=async(req,res,next)=>{
    try{
      const userid=req.userid;
      const fileData=await dashboardService.getFiles(userid);
      res.status(200).json({fileData});
    }
    catch(err){
        next(err);
    }
}

module.exports.userDetails=async(req,res,next)=>{
    try{
        const userid=req.userid;
        const result=await dashboardService.userDetails(userid);
        res.status(200).json({profile_pic:result[0].profile_pic});
        
    }
    catch(err){
        next(err);
    }
}

module.exports.getCategories_vendors=async(req,res,next)=>{
    try{
        const {categories,vendors}=await dashboardService.getCategories_vendors();
        res.status(200).json({categories,vendors});
    }
    catch(err){
        next(err);
    }
}

module.exports.addProduct=async(req,res,next)=>{
    try{
        const {productName,vendor_id,category_id,quantity,measure,price}=req.body;
        const product_id=await dashboardService.addProduct(productName,vendor_id,category_id,quantity,measure,price);
        res.status(201).json({product_id,bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteProduct=async(req,res,next)=>{
    try{
        const vendor_id=req.query.vendor_id;
        const product_id=req.query.product_id;
        await dashboardService.deleteProduct(product_id,vendor_id);
        res.status(200).json({message:"Deleted successfully",bool:true});
    }
    catch(err){
        next(err);
    }
}