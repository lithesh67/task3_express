/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('chats_users');
   if(exists){
    return knex.schema.alterTable('chats_users',(table)=>{
        table.string('chat_name').notNullable();
        table.enum('is_read',['0','1']).notNullable().defaultTo('1')
    });
   }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('chats_users',(table)=>{
    table.dropColumn('chat_name');
    table.dropColumn('is_read');
  })
};
