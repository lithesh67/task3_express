/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists=await knex.schema.hasTable('chats');
  if(!exists){
    return knex.schema.createTable('chats',(table)=>{
        table.increments('chat_id').primary();
        table.enum('is_group',['0','1']).notNullable();
        table.string('group_name').nullable();
        table.timestamps(true,true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('chats');
};
