/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('users');
    if(!exists){
        return knex.schema.createTable('users',(table)=>{
            table.increments('id').primary();
            table.string('first_name',255).notNullable();
            table.string('last_name',255).notNullable();
            table.text('username').unique();
            table.text('password').notNullable();
            table.string('email').notNullable().unique();
            table.text('profile_pic').nullable().unique();
            table.text('thumbnail').nullable().unique();
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
   return knex.schema.dropTableIfExists('users');
};
