/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
  const exists=await knex.schema.hasTable('files');
  if(exists){
    return knex.schema.alterTable('files',(table)=>{
        table.enum('status',['0','1','2','99']).notNullable().defaultTo('0');
        table.enum('purpose',['0','1']).notNullable().defaultTo('0');
        table.text('error_file').nullable();
    })
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.table('files',(table)=>{
     table.dropColumn('status');
     table.dropColumn('purpose');
     table.dropColumn('error_file');
   })
};
