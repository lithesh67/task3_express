const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition={
    openapi:'3.0.0',
    info:{
        title:'API documentaation',
        version:'1.0.0',
        description:'Inventory APIs'
    },
    servers:[
        {
            url:'http://localhost:5000',
            description:'Development server'
        }
    ],
    components:{
        securitySchemes:{
            BearerAuth:{
                type:'http',
                scheme:'bearer',
                bearerFormat:'JWT'
            }
        }
    },
    security:[
        {
            BearerAuth:[]
        }
    ]
}

const option={
    swaggerDefinition,
    apis:['./src/v1/**/api_docs/*.docs.js']
};

const swaggerSpec=swaggerJSDoc(option);

// console.log(swaggerSpec);

module.exports=swaggerSpec;
