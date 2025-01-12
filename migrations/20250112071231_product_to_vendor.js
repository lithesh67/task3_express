/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('products_to_vendors');
    if(!exists){
        return knex.schema.createTable('products_to_vendors',(table)=>{
            table.increments('products_to_vendors_id').primary();
            table.integer('vendor_id').unsigned().references('vendor_id').inTable('vendors');
            table.integer('product_id').unsigned().references('product_id').inTable('products');
            table.enum('status',['0','1','2','99']).notNullable().defaultTo('0');
            table.timestamps(true,true);
        })
    }
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products_to_vendors');
  
};
