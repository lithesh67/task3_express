/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('messages');
   if(!exists){
    return knex.schema.createTable('messages',(table)=>{
        table.increments('message_id').primary();
        table.integer('chat_id').unsigned().references('chat_id').inTable('chats');
        table.integer('sender_id').unsigned().references('id').inTable('users');
        table.text('message').notNullable();
        table.timestamps(true,true);
    })
   }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists('messages');
};
