const { response } = require("express");
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
        let result=await dashboardService.userDetails(userid);
        result=process.env.aws_domain+result[0].thumbnail;
        res.status(200).json({profile_pic:result});
        
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

module.exports.onSearch=async(req,res,next)=>{
    try{
        const text=req.query.text;
        const pageSize=req.query.pageSize;
        const current_page=req.query.current_page;
        let filterCols=req.query.filterCols;
        if(!Array.isArray(filterCols)){
           filterCols=[filterCols];
        }
        const {result,count}=await dashboardService.onSearch(text,pageSize,current_page,filterCols);
        res.status(200).json({tableData:result,count:count});
    }
    catch(err){
        next(err);
    }
}


module.exports.addNewData=async(req,res,next)=>{
    try{
       const {newData}=req.body;
       await dashboardService.addNewData(newData);
       res.status(201).json({message:"Inserted successfully"});
    }
    catch(err){
        next(err);
    }
}

module.exports.editProduct=async(req,res,next)=>{
    try{
       const {obj,vendorArray,product_id}=req.body;
       console.log(obj,vendorArray,product_id);
       await dashboardService.editProduct(obj,vendorArray,product_id);
       res.status(201).json({message:"updated successfully"});
       
    }
    catch(err){
        next(err);
    }
}

module.exports.removeFromCart=async(req,res,next)=>{
    try{
       const {product_id,selectedQuantity,stock}=req.body;
       await dashboardService.removeFromCart(product_id,selectedQuantity,stock);
       res.status(200).json({message:"Item removed",bool:true}); 
    }
    catch(err){
        next(err);
    }
}