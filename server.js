const express=require('express');
const app=express();
const env=require('dotenv').config();
const {globalError}=require('./src/middleware/error_handlers/globalError');
const cors=require('cors');
const port=process.env.PORT;
require('./src/mysql/db');
app.use(cors({origin:"http://localhost:4200"}));
app.use(express.json());


app.use('/api',require('./src/v1/v1Routes'));

app.use(globalError);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
