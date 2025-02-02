const express=require('express');
const { processExcel } = require('./scheduled.controller');
const router=express.Router();

router.route('/start_cron_job').get(processExcel);

module.exports=router;