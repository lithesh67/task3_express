const express=require('express');
const router=express.Router();

router.use(require('./auth_users/auth_users.routes'));
router.use(require('./dashboard/dashboard.routes'));
router.use(require('./filleHandler/fileHandler.routes'));
router.use(require('./scheduled/scheduled.routes'));
router.use(require('./notifications/notifications.routes'));
router.use(require('./chat/chat.routes'));

module.exports=router;

//might have forgotten to export the routes of controller