'use strict'

var argv = require('minimist')(process.argv.slice(2));

if (argv.h) {
    console.log("usage:\n" +
        "Attention: Parameters override environment variables.\n" +
        "-path [path] (required) Root path for documents Ex: /Users/danfes/\n" +
        "-token [token] (required) Application token, you get one after singing up\n" +
        "-logFile [file] (optional) Log file destination Ex: /var/log/notabook.log\n" +
        "-logLevel [level] (optional) Log level: [debug, info, error]\n");
    process.exit();
} else {
    console.log('Use -h help');
}

const EXT = '.xml';

let path = argv.path || process.env.NOTABOOK_PATH;
let token = argv.token || process.env.NOTABOOK_TOKEN;
let logFile = argv.logFile || process.NOTABOOK_LOGFILE;
let logLevel = argv.logLevel || process.NOTABOOK_LOGLEVEL;

var logger = require('winston');
logger.remove(logger.transports.Console);
if (logFile) {
    let configure = {
        filename: logFile,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false
    };
    logger.exitOnError = false;
    logger.add(logger.transports.File, configure);
} else {
    let configure = {
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false
    }
    logger.add(logger.transports.Console, configure);
}

if (['error', 'info', 'debug'].indexOf(logLevel) === -1) logLevel = 'debug';
logger.level = logLevel;

logger.info(`Running parameters`);
logger.info(`Path = ${path}`);
logger.info(`Token = ${token}`);
logger.info(`LogFile = ${logFile}`);
logger.info(`LogLevel = ${logLevel}`);

var Finder = require('./Finder');
// var Keeper = require('Keeper');

var finder = null;

try {
    finder = new Finder({logger: logger}, EXT, path);
} catch (e) {
    logger.error(e);
    process.exit(-1);
}

let batch = (data) => {
    console.dir(data);
}

let search = () => {
    finder.search(batch);    
}

search();