/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('notifications');
   if(exists){
    return knex.schema.createTable('notifications',(table)=>{
        table.increments('notification_id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.string('notification_title').notNullable();
        table.text('message').notNullable();
        table.enum('is_read',['0','1']).notNullable().defaultTo('0');
        table.timestamps(true,true);
    });
   }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('notifications');
};
