/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('users');
   return knex.schema.alterTable('users',(table)=>{
      table.text('reset_token').nullable();
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.table('users',(table)=>{
    table.dropColumn('reset_token');
   })
};
