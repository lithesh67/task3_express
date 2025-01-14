const express=require('express');
const router=express.Router();

router.use(require('./auth_users/auth_users.routes'));
router.use(require('./dashboard/dashboard.routes'));

module.exports=router;

//might have forgotten to export the routes of controller