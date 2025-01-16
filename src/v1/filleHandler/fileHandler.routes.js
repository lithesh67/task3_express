const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { uploadImage, getUrl, uploadFile } = require('./fileHandler.controller');
const router=express.Router();

router.route('/getUrl').get(validateToken,getUrl);
router.route('/updateProfile').post(validateToken,uploadImage);
router.route('/uploadFile').post(validateToken,uploadFile);

module.exports=router;
