const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { getAllUsers, createChat, getExistingChats, getUserChat, createGroup } = require('./chat.controller');
const router=express.Router();

router.route('/allUsers').get(validateToken,getAllUsers);
router.route('/createChat').post(validateToken,createChat);
router.route('/existingChats').get(validateToken,getExistingChats);
router.route('/userChat').get(validateToken,getUserChat);
router.route('/newGroup').post(validateToken,createGroup);

module.exports=router;