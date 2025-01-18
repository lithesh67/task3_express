const joi=require('joi');

module.exports.uploadImageSchema=joi.object({
    profile_url:joi.string().required(),
    user_id: joi.alternatives().try(joi.number().integer(),joi.string()).required()
})

module.exports.getUrlSchema=joi.object({
    fileType:joi.string().required(),
    fileKey:joi.string().required(),
})

module.exports.uploadFileSchema=joi.object({
    fileName:joi.string().required(),
    url:joi.string().required(),
    fileType:joi.string().required(),
    fileSize:joi.alternatives().try(joi.number().integer(),joi.string()).required()
});

module.exports.productImageSchema=joi.object({
    url:joi.string().required(),
    product_id:joi.alternatives().try(joi.number().integer(),joi.string()).required()
})

