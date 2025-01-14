// Update with your config settings.
const env=require('dotenv').config({path:'../../.env'});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST_NAME,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.DB_PASSWORD,
      port:4406
    },
    migrations:{
      directory: '../../migrations',
    },
    seeds:{
      directory:'../../seeds',
    }
  },
  
};
