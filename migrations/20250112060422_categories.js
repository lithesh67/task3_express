/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
  const exists=await knex.schema.hasTable('categories');
  if(!exists){
    return knex.schema.createTable('categories',(table)=>{
        table.increments('category_id').primary();
        table.string('category').notNullable().unique();
        table.text('description').notNullable();
        table.enum('status',['0','1','2','99']).notNullable().defaultTo('0');
        table.timestamps(true,true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
