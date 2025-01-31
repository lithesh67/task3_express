const joi=require('joi');

module.exports.excelHeadingSchema=joi.object({
    product_name:joi.required(),
    category:joi.required(),
    quantity_in_stock:joi.required(),
    unit_price:joi.required(),
    vendors: joi.required()
})

module.exports.excelRowSchema=joi.object({
   product_name:joi.string().required(),
   category:joi.string().required(),
   quantity_in_stock:joi.number().integer().required(),
   unit_price:joi.number().integer().required(),
   vendors:joi.string().required(),
   measure:joi.string().required()
})