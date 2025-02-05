const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { getAllUsers, createChat, getExistingChats } = require('./chat.controller');
const router=express.Router();

router.route('/allUsers').get(validateToken,getAllUsers);
router.route('/createChat').post(validateToken,createChat);
router.route('/existingChats').get(validateToken,getExistingChats);

module.exports=router;