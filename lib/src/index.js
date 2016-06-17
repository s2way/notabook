'use strict'

var argv = require('minimist')(process.argv.slice(2));
var C = require('./constants');
import path from 'path';
import moment from 'moment';

if (argv.h) {
    console.log("usage:\n" +
        "Attention: Parameters override environment variables.\n" +
        "-path [path] (required) Root path for documents Ex: /Users/danfes/\n" +
        "-token [token] (required) Application token, you get one after singing up\n" +
        "-logFile [file] (optional) Log file destination Ex: /var/log/notabook.log\n" +
        "-logLevel [level] (optional) Log level: [debug, info, error]\n" +
        "-delay [minutes] (optional) Reduce time from now to avoid conflicts, default and minimum is 5\n");
    process.exit();
} else {
    console.log('Use -h help');
}

let rootPath = argv.path || process.env.NOTABOOK_PATH;
rootPath = path.resolve(rootPath);
let token = argv.token || process.env.NOTABOOK_TOKEN;
let logFile = argv.logFile || process.NOTABOOK_LOGFILE;
let logLevel = argv.logLevel || process.NOTABOOK_LOGLEVEL;
let delay = argv.delay || process.NOTABOOK_DELAY;
if (!delay || delay < 5) delay = C.DEFAULT_DELAY;

import logger from 'winston';
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
logger.info(`Path = ${rootPath}`);
logger.info(`Token = ${token}`);
logger.info(`LogFile = ${(logFile) ? logFile : 'console'}`);
logger.info(`LogLevel = ${logLevel}`);
logger.info(`Delay = ${delay} minutes`);
logger.info(`Extension = ${C.EXT}`);
logger.info(`DB = ${C.STORAGE}`);

import Finder from './Finder';
import Keeper from './Keeper';

var finder = null;
var keeper = null;

try {
    finder = new Finder({logger: logger});
} catch (e) {
    logger.error(e);
    process.exit(-1);
}

try {
    keeper = new Keeper({logger: logger}, C.STORAGE);
} catch (e) {
    logger.error(e);
    process.exit(-1);
}

let _search = () => {
    let lastDate = _getDate();
    let newLastDate = _newDate();
    logger.info(`Date - from: ${lastDate} to: ${newLastDate}`);
    finder.search({
        extension: C.EXT,
        rootPath: rootPath,
        from: moment(new Date(lastDate)),
        to: moment(new Date(newLastDate))
    }, _processBatch);
}

let _getDate = () => {
    let lastDate = keeper.getDate();
    if (!lastDate) {
        lastDate = new Date(0);
        keeper.setDate(lastDate);
    }
    return lastDate;
}

let _newDate = () => {
    return new Date(moment().subtract(delay, 'minutes'));
}

let _processBatch = (data, info) => {
    keeper.setBatch(data);
    keeper.setDate(info.date);
    if (info) logger.info(`Found: ${data.length} files(s) in ${moment.duration(moment(new Date(info.finished)).diff(moment(new Date(info.started)))).asSeconds()} second(s).`);
    _process(data);
}

let _process = (data) => {
    logger.info(`Processing...`);
}

let run = () => {
    logger.debug('Run invoked');
    let lastBatch = keeper.getBatch();
    if (lastBatch && lastBatch.length) {
        logger.info('Batch has found data, reprocessing');
        _process(lastBatch);
    } else {
        _search();
    }
}

run();