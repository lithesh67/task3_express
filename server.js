const express=require('express');
const app=express();
const env=require('dotenv').config();
const {globalError}=require('./src/middleware/error_handlers/globalError');
const cors=require('cors');
const port=process.env.PORT;
const swaggerUi=require('swagger-ui-express');

require('./src/mysql/db');
app.use(cors({origin:"http://localhost:4200",exposedHeaders:['Authorization']}));
app.use(express.json());

const swaggerSpec=require('./src/utils/swagger_specs');
const { processExcel } = require('./src/v1/scheduled/scheduled.controller');

processExcel();
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api',require('./src/v1/v1Routes'));

app.use(globalError);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`); 
});
