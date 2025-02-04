const express=require('express');
const { getProducts, getFiles, userDetails, getCategories_vendors, addProduct, deleteProduct, updateQuantity, fetchAll, onSearch, addNewData, editProduct, removeFromCart } = require('./dashboard.controller');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { authorizeRoles } = require('../../middleware/httpMiddleware/roleValidation');
const router=express.Router();

router.route('/dashboard').get(validateToken,getProducts);
router.route('/getFiles').get(validateToken,getFiles);
router.route('/getUserDetails').get(validateToken,userDetails);
router.route('/getCategories_vendors').get(validateToken,getCategories_vendors);
router.route('/addProduct').post(validateToken,authorizeRoles('admin'),addProduct);
router.route('/deleteProduct').delete(validateToken,authorizeRoles("admin"),deleteProduct);
router.route('/updateQuantity').patch(validateToken,updateQuantity);
router.route('/fetchAll').get(validateToken,fetchAll);
router.route('/search').get(validateToken,onSearch);
router.route('/importData').post(validateToken,addNewData); //got removed
router.route('/editProduct').post(validateToken,authorizeRoles('admin','manager'),editProduct);
router.route('/removeFromCart').patch(validateToken,removeFromCart);

module.exports=router;