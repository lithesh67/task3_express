const { logger } = require("../loggers/logger");

module.exports.globalError=(err,req,res,next)=>{
    console.error(err.stack);
    logger.error({message:err.message,status:err.status || 500,url:req.originalUrl,method:req.method,stack:err.stack});
    res.status(err.status|| 500).json({
        message: err.message || "Internal server error",
        bool:false
    });
}
 