const express=require('express');
const { getProducts } = require('./dashboard.controller');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const router=express.Router();

router.route('/dashboard').get(getProducts);

module.exports=router;