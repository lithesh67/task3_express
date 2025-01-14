const dashboardService = require("./dashboard.service");


module.exports.getProducts=async(req,res,next)=>{
    try{
        page=parseInt(req.query.page);
        limit=parseInt(req.query.limit);
        
        data=await dashboardService.getProducts(page,limit);
        res.json({message:"retrieved successfully",bool:true,tableData:data});
    }
    catch(err){
        next(err);
    }
}