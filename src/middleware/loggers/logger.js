const {createLogger,format,transports}=require('winston');

module.exports.logger=createLogger({
    level:'info',
    format:format.combine(format.colorize(),format.json()),
    transports:[
        new transports.File({filename:'./src/middleware/loggers/regularLogs.log',level:'info'}),
        new transports.File({filename:'./src/middleware/loggers/errorLogs.log',level:'error'})
    ]
});
