/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('chat_users');
    if(!exists){
     return knex.schema.createTable('chats_users',(table)=>{
       table.increments('chat_users_id').primary();
       table.integer('chat_id').unsigned().references('chat_id').inTable('chats');
       table.integer('user_id').unsigned().references('id').inTable('users');
       table.timestamps(true,true);
 
     })
    }
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
    return knex.schema.dropTableIfExists('chat_users');
 };
 