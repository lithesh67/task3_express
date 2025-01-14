const dashboardQueries = require("./dashboard.queries");

module.exports=class dashboardService{

    static async getProducts(page,limit){
        try{
            const offset=(page-1)*limit;
            const result=await dashboardQueries.getProducts(offset,limit);
            return result;
        }
        catch(err){
            throw err;
        }
    }
}