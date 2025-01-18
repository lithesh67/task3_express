const joi=require('joi');

module.exports.getProductsSchema=joi.object({
    limit: joi.alternatives().try(joi.number().integer(),joi.string()).required(),
    page: joi.alternatives().try(joi.number().integer(),joi.string()).required()
});

module.exports.getFilesSchema=joi.object({
    userid:  joi.alternatives().try(joi.number().integer(),joi.string()).required()
});

module.exports.userDetailsSchema=joi.object({
    userid:  joi.alternatives().try(joi.number().integer(),joi.string()).required(),
})

module.exports.deleteProductSchema=joi.object({
    product_id:  joi.alternatives().try(joi.number().integer(),joi.string()).required(),
})

module.exports.addProductSchema=joi.object({
    productName: joi.string().required(),
    vendor_id :  joi.alternatives().try(joi.number().integer(),joi.string()).required(),
    category_id :joi.alternatives().try(joi.number().integer(),joi.string()).required(),
    quantity :joi.alternatives().try(joi.number().integer(),joi.string()).required(),
    measure : joi.string().required(),
    price :   joi.alternatives().try(joi.number().integer(),joi.string()).required(),
})

module.exports.updateQuantitySchema=joi.object({

})