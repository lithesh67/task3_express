const knex=require('../../mysql/db');
const Products=require('../../models/Products.model');
const Files=require('../../models/Files.models');
const ProductsVendors=require('../../models/Products_To_Vendors.models');
const Users=require('../../models/Users.model');
const Categories=require('../../models/Categories.models');
const Vendors=require('../../models/Vendors.models');
const Products_To_Vendors = require('../../models/Products_To_Vendors.models');


module.exports=class dashboardQueries{

    static async getProducts(offset,limit){
       try{
        const count=await ProductsVendors.query(knex).countDistinct('product_id as count').where('status','!=','99');
        const result=await Products.query(knex).select(
            ['pv.product_id','p.product_name','p.quantity_in_stock','p.unit_price','p.category_id',
            'c.category','p.measure','pv.created_at','p.product_image',knex.raw('GROUP_CONCAT(v.vendor_name) as vendors')])
            .from('products_to_vendors as pv').where('p.status','!=','99')
            .leftJoin('products as p','p.product_id','pv.product_id')
            .leftJoin('categories as c','c.category_id','p.category_id')
            .leftJoin('vendors as v','v.vendor_id','pv.vendor_id')
            .groupBy('pv.product_id').offset(offset).limit(limit);
        
        return {result,count};
       }
       catch(err){
          throw err;
       }
    }

    static async getFiles(userid){
        try{
            const result= await Files.query(knex).select(['file_name','file_type','file_size','file_path'])
                          .where('user_id','=',userid);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async userDetails(userid){
        try{
            return await Users.query(knex).select(['thumbnail']).where('id','=',userid);
        }
        catch(err){
            throw err;
        }
    }

    static async getCategories_vendors(){
        try{
            const categories=await Categories.query(knex).select(['category','category_id']);
            const vendors=await Vendors.query(knex).select(['vendor_name','vendor_id']);
            return {categories,vendors};
        }
        catch(err){
            throw err;
        }
    }

    static async addProduct(productName,vendor_id,category_id,quantity,measure,price){
        const trx=await knex.transaction();
        try{
            const insertedProduct=await Products.query(trx).insert({
                product_name:productName,
                category_id:category_id,
                quantity_in_stock:quantity,
                measure:measure,
                unit_price: price
            });
            
            const result2=await Products_To_Vendors.query(trx).insert({
                vendor_id:vendor_id,
                product_id:insertedProduct.product_id
            });
            trx.commit();
            return insertedProduct.product_id;
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async deleteProduct(product_id){
        const trx=await knex.transaction();
        try{
            await Products.query(trx).patch({status:'99'}).where('product_id','=',product_id);
            await Products_To_Vendors.query(trx).patch({status:'99'}).where('product_id','=',product_id);
        }
        catch(err){
            throw err;
        }
    }

    static async updateQuantity(tempCartArray){
       const trx=await knex.transaction();
       try{
          for(let i=0;i<tempCartArray.length;i++){
            console.log(tempCartArray[i]);
            let addthis=tempCartArray[i].selectedQuantity;
            let product_id=tempCartArray[i].product_id;
            let existingQuantity=tempCartArray[i].quantity_in_stock;
            await Products.query(trx).patch({
                quantity_in_stock:  existingQuantity+addthis
                }).where('product_id','=',product_id);
          }
          trx.commit();
          return;
       }
       catch(err){
        trx.rollback();
        throw err;
       }
    }

    static async fetchAll(){
        try{
            const result=await Products.query(knex).select(
                ['pv.product_id','p.product_name','p.quantity_in_stock',
                'c.category','p.measure','pv.created_at','p.product_image',knex.raw('GROUP_CONCAT(v.vendor_name) as vendors')])
                .from('products_to_vendors as pv').where('p.status','!=','99')
                .leftJoin('products as p','p.product_id','pv.product_id')
                .leftJoin('categories as c','c.category_id','p.category_id')
                .leftJoin('vendors as v','v.vendor_id','pv.vendor_id')
                .groupBy('pv.product_id');
            return  result;
        }
        catch(err){
            throw err;
        }
    }

    static async onSearch(text,pageSize,current_page,filterCols){
        try{
            const concatColumns = filterCols.join(", ' ', ");
            
            const query=Products.query(knex).select(
                ['pv.product_id','p.product_name','p.quantity_in_stock',
                'c.category','p.measure','pv.created_at','p.product_image',knex.raw('GROUP_CONCAT(v.vendor_name) as vendors')])
                .from('products_to_vendors as pv').where('p.status','!=','99')
                .leftJoin('products as p','p.product_id','pv.product_id')
                .leftJoin('categories as c','c.category_id','p.category_id')
                .leftJoin('vendors as v','v.vendor_id','pv.vendor_id')
                .groupBy('pv.product_id').where(function(){
                    for(const column of filterCols){
                      this.orWhereRaw(`LOWER(TRIM(${column})) LIKE '%${text.trim().toLowerCase()}%'`);
                    }
                })
            const count=await query.resultSize();
            const result=await query.offset((current_page-1)*pageSize).limit(pageSize);
            
            return {result,count};
        } 
        catch(err){
            throw err;
        }
    }

    static async addNewData(newData){
        const trx=await knex.transaction();
        try{
           for (let product of newData){
             const inserted=await Products.query(trx).insert({
                product_name:product.product_name,
                category_id:product.category_id,
                quantity_in_stock:product.quantity_in_stock,
                unit_price:product.unit_price,
                measure:product.measure
             });
             await Products_To_Vendors.query(trx).insert({
                product_id:inserted.product_id,
                vendor_id:product.vendor_id
             });
           }
           trx.commit();
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }

    static async editProduct(obj,vendorArray,product_id){
        const trx=await knex.transaction();
        try{
          await Products.query(trx).patch({
            product_name:obj.productName,
            category_id:obj.category_id,
            quantity_in_stock:obj.quantity,
            measure: obj.measure,
            unit_price:obj.price
          }).where('product_id','=',product_id);
          for(let i=0;i<vendorArray.length;i++){
            const exists=await Products_To_Vendors.query(trx).select('vendor_id').where('product_id','=',product_id).where('vendor_id','=',vendorArray[i]);
            if(exists.length==0){
                await Products_To_Vendors.query(trx).insert({product_id:product_id,vendor_id:vendorArray[i]});
            }
          }
          trx.commit();
        }
        catch(err){
            trx.rollback();
            throw err;
        }
    }
}

// select pv.product_id, p.product_name,pv.vendor_id,sum(p.quantity_in_stock),p.unit_price,c.category,v.vendor_name,GROUP_CONCAT(v.vendor_name ORDER BY v.vendor_name) AS vendor_names
// from
// products_to_vendors pv left join  products p on p.product_id=pv.product_id
// left join categories c on c.category_id=p.category_id 
// left join vendors v on v.vendor_id=pv.vendor_id
// group by pv.product_id;