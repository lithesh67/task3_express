const Files=require('../../models/Files.models');
const Notifications = require('../../models/Notifications.models');
const Products = require('../../models/Products.model');
const Products_To_Vendors = require('../../models/Products_To_Vendors.models');
const knex=require('../../mysql/db');

module.exports=class scheduledQueries{
    static async getUnprocessedFile(){
        try{
            const files=await Files.query(knex).select(['user_id','file_id','file_path','file_name']).where('purpose','=','1').where('status','=','0').limit(1);
            return files;
        }
        catch(err){
            throw err;
        }
    }

    static async storeTheErrorUrl(error_url,file_id){
        try{
            await Files.query(knex).patch({error_file:error_url}).where('file_id','=',file_id);
        }
        catch(err){
            throw err;
        }
    }

    static async insertValidRows(validRows){
        const trx=await knex.transaction();
        try{
            for(let row of validRows){
                const insertedProduct=await Products.query(trx).insert({
                    product_name:row.product_name,
                    category_id:row.category_id,
                    quantity_in_stock:row.quantity_in_stock,
                    measure:row.measure,
                    unit_price:row.unit_price,
                });
                for(let vendor_id of row.vendors)
                await Products_To_Vendors.query(trx).insert({
                   product_id:insertedProduct.product_id,
                   vendor_id:vendor_id
                });
            }
            trx.commit();
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async insertNotification(file_data,message,notification_title){
        try{
           const insertedNote=await Notifications.query(knex).insert({
             user_id:file_data[0].user_id,
             notification_title:notification_title,
             message:message,
           });
           return insertedNote.id;
        }
        catch(err){
            throw err;
        }
    }

    static async updateFileStatus(file_data,status){
        try{
           await Files.query(knex).patch({status:status}).where('file_id','=',file_data[0].file_id);
        }
        catch(err){
            throw err;
        }
    }
}