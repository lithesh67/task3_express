/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('files');
    if(!exists){
        return knex.schema.createTable('files',(table)=>{
            table.increments('file_id').primary();
            table.string('file_name').notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users'),
            table.string('file_type').notNullable();
            table.text('file_path').notNullable();
            table.string('file_size').notNullable();
            table.timestamps(true,true);
        });
    }
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('files');
};
