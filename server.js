const express=require('express');
const app=express();
const http=require('http');
const httpServer=http.createServer(app);
const env=require('dotenv').config();
const cron=require('node-cron');
const {globalError}=require('./src/middleware/error_handlers/globalError');
const cors=require('cors');
const port=process.env.PORT;
const socketio=require('./src/utils/socket');
const swaggerUi=require('swagger-ui-express');

require('./src/mysql/db');

socketio.initializeScoket(httpServer);
app.use(cors({origin:"http://localhost:4200",exposedHeaders:['Authorization']}));
app.use(express.json());

const swaggerSpec=require('./src/utils/swagger_specs');


const { processExcel } = require('./src/v1/scheduled/scheduled.controller');

// processExcel();
cron.schedule("*/30 * * * * *",()=>{
    try{
       console.log("Running the cron job");
        processExcel();
    }
    catch(err){
        console.log(err);
    }
});

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api',require('./src/v1/v1Routes'));

app.use(globalError);

httpServer.listen(port,()=>{
    console.log(`Server is running on port ${port}`); 
});
