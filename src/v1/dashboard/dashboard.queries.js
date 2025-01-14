const knex=require('../../mysql/db');
const Products=require('../../models/Products.model');

module.exports=class dashboardQueries{

    static async getProducts(offset,limit){
       try{
        const result=await Products.query(knex).select(
            ['pv.product_id','p.product_name','v.vendor_name','p.quantity_in_stock',
            'c.category','p.measure',knex.raw('GROUP_CONCAT(v.vendor_name) as vendors')])
            .from('products_to_vendors as pv')
            .leftJoin('products as p','p.product_id','pv.product_id')
            .leftJoin('categories as c','c.category_id','p.category_id')
            .leftJoin('vendors as v','v.vendor_id','pv.vendor_id')
            .groupBy('pv.product_id').offset(offset).limit(limit);
        
        return result;
       }
       catch(err){
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