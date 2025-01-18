const express=require('express');
const { getProducts, getFiles, userDetails, getCategories_vendors, addProduct, deleteProduct, updateQuantity, fetchAll } = require('./dashboard.controller');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const router=express.Router();

router.route('/dashboard').get(validateToken,getProducts);
router.route('/getFiles').get(validateToken,getFiles);
router.route('/getUserDetails').get(validateToken,userDetails);
router.route('/getCategories_vendors').get(validateToken,getCategories_vendors);
router.route('/addProduct').post(validateToken,addProduct);
router.route('/deleteProduct').delete(validateToken,deleteProduct);
router.route('/updateQuantity').patch(validateToken,updateQuantity);
router.route('/fetchAll').get(validateToken,fetchAll);

module.exports=router;