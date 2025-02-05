const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { getAllUsers, createChat, getExistingChats, getUserChat } = require('./chat.controller');
const router=express.Router();

router.route('/allUsers').get(validateToken,getAllUsers);
router.route('/createChat').post(validateToken,createChat);
router.route('/existingChats').get(validateToken,getExistingChats);
router.route('/userChat').get(validateToken,getUserChat);

module.exports=router;