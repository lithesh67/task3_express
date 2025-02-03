const express=require('express');
const { validateToken } = require('../../middleware/httpMiddleware/tokenValidation');
const { getNotifications, markRead } = require('./notifications.controller');
const router=express.Router();

router.route('/notifications').get(validateToken,getNotifications);
router.route('/markRead').patch(validateToken,markRead);

module.exports=router;