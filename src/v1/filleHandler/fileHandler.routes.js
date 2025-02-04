const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { uploadImage, getUrl, uploadFile, productImage, importedFiles } = require('./fileHandler.controller');
const { authorizeRoles } = require('../../middleware/httpMiddleware/roleValidation');
const router=express.Router();

router.route('/getUrl').get(validateToken,getUrl);
router.route('/updateProfile').post(validateToken,uploadImage);
router.route('/uploadFile').post(validateToken,uploadFile);
router.route('/uploadProductImage').post(validateToken,productImage);
router.route('/importedFiles').get(validateToken,authorizeRoles("admin"),importedFiles);

module.exports=router;
