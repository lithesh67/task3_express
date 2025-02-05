/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
  const exists=await knex.schema.hasTable('users');
  return knex.schema.alterTable('users',(table)=>{
    table.enum('role',['admin','user','manager']).defaultTo('user').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('users',(table)=>{
    table.dropColumn('role');
  })
};
