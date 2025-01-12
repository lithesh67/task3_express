const express=require('express');
const { loginUser, register } = require('./auth_users.controller');
const router=express.Router();

router.route('/login').post(loginUser);
router.route('/signup').post(register);

module.exports=router; 