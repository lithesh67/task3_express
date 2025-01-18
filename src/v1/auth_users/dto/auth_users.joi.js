const joi=require('joi');

module.exports.loginUserSchema=joi.object({
    identifier: joi.string().required(),
    password: joi.string().required()
});

module.exports.registerSchema=joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
})