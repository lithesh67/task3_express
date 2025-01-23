/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const exists=await knex.schema.hasTable('users');
    if(exists){
        return knex.schema.alterTable('users',(table)=>{
            table.text('refresh_token').nullable().unique();
        });
    }
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('users',(table)=>{
    table.dropColumn('refresh_token');
   })
};
