const dashboardQueries = require("./dashboard.queries");

module.exports=class dashboardService{

    static async getProducts(page,limit){
        try{
            const offset=(page-1)*limit;
            const {result,count}=await dashboardQueries.getProducts(offset,limit);
            return {result,count};
        }
        catch(err){
            throw err;
        }
    }

    static async getFiles(userid){
        try{
            return dashboardQueries.getFiles(userid);
        }
        catch(err){
            throw err;
        }
    }

    static async userDetails(userid){
        try{
            return dashboardQueries.userDetails(userid);
        }
        catch(err){
            throw err;
        }
    }

    static async getCategories_vendors(){
        try{
            return dashboardQueries.getCategories_vendors();
        }
        catch(err){
            throw err;
        }
    }

    static async addProduct(productName,vendor_id,category_id,quantity,measure,price){
        try{
           return dashboardQueries.addProduct(productName,vendor_id,category_id,quantity,measure,price);
        }
        catch(err){
            throw err;
        }
    }

    static async deleteProduct(product_id){
        try{
            await dashboardQueries.deleteProduct(product_id);
        }
        catch(err){
            throw err;
        }
    }

    static async updateQuantity(tempCartArray){
        try{
            await dashboardQueries.updateQuantity(tempCartArray);
        }
        catch(err){
            throw err;
        }
    }

    static async fetchAll(){
        try{
            return dashboardQueries.fetchAll();
        }
        catch(err){
            throw err;
        }
    }

}