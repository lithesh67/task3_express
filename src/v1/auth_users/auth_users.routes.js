const express=require('express');
const { loginUser, register, verifyToken, forgotPassowrd, resetPassword } = require('./auth_users.controller');
// const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const router=express.Router();

router.route('/login').post(loginUser);
router.route('/signup').post(register);
router.route('/forgotPassword').post(forgotPassowrd);
router.route('/reset').post(resetPassword);
// router.route('/verifyToken').get(validateToken,verifyToken);

module.exports=router; 