const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { getNotifications } = require('./notifications.controller');
const router=express.Router();

router.route('/notifications').get(validateToken,getNotifications);

module.exports=router;