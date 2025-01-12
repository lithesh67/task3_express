/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
  const exists=await knex.schema.hasTable('products');
  if(!exists){
    return knex.schema.createTable('products',(table)=>{
        table.increments('product_id').primary();
        table.string('product_name').notNullable();
        table.integer('category_id').unsigned().references('category_id').inTable('categories');
        table.integer('quantity_in_stock').notNullable();
        table.string('measure').nullable();
        table.integer('unit_price').notNullable();
        table.text('product_image').nullable().unique();
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
  return knex.schema.dropTableIfExists('products');
};
