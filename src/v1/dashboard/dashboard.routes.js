const express=require('express');
const { getProducts } = require('./dashboard.controller');
const router=express.Router();

router.route('/dashboard').get(getProducts);

module.exports=router;