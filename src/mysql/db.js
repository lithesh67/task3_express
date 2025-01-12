const {Model}=require('objection');
const knex=require('knex');
const knexconfig=require('./knexfile');
const db=knex(knexconfig['development']);
Model.knex(db);
db.raw('select 1+1 as result').then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err);
});

module.exports=db; 