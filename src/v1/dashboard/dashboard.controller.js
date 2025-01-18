const dashboardService = require("./dashboard.service");
const { getProductsSchema, getFilesSchema, userDetailsSchema, deleteProductSchema, addProductSchema } = require("./dto/dashboard.joi");


module.exports.getProducts=async(req,res,next)=>{
    page=parseInt(req.query.page);
    limit=parseInt(req.query.limit);
    const {error}=getProductsSchema.validate({
        page,limit
    });
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    try{
        const {result,count}=await dashboardService.getProducts(page,limit);
        res.status(200).json({message:"retrieved successfully",bool:true,tableData:result,count:count[0].count});
    }
    catch(err){
        next(err);
    }
}

module.exports.getFiles=async(req,res,next)=>{
    const userid=req.userid;
    const {error}=getFilesSchema.validate({
        userid
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    try{
      const fileData=await dashboardService.getFiles(userid);
      res.status(200).json({fileData});
    }
    catch(err){
        next(err);
    }
}

module.exports.userDetails=async(req,res,next)=>{
    const userid=req.userid;
    const {error}=userDetailsSchema.validate({
        userid
    });
    if(error){
        return res.status(400).json({message: error.details[0].message}); 
    }
    try{
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
    const {productName,vendor_id,category_id,quantity,measure,price}=req.body;
    const {error}=addProductSchema.validate({
        productName,vendor_id,category_id,quantity,measure,price    
    })
    if(error){
        return res.status(400).json({message: error.details[0].message}); 
    }
    try{
        const product_id=await dashboardService.addProduct(productName,vendor_id,category_id,quantity,measure,price);
        res.status(201).json({product_id,bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.deleteProduct=async(req,res,next)=>{
    const product_id=req.query.product_id;
    const {error}=deleteProductSchema.validate({
        product_id
    })
    if(error){
        return res.status(400).json({message: error.details[0].message});  
    }
    try{
        await dashboardService.deleteProduct(product_id);
        res.status(200).json({message:"Deleted successfully",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.updateQuantity=async(req,res,next)=>{
    const {tempCartArray}=req.body;
    try{
        await dashboardService.updateQuantity(tempCartArray);
        res.status(200).json({message:"Updated successfully",bool:true});
    }
    catch(err){
        next(err);
    }
}

module.exports.fetchAll=async(req,res,next)=>{
    try{
        const result=await dashboardService.fetchAll();
        res.status(200).json({result});
    }
    catch(err){
        next(err);
    }
}