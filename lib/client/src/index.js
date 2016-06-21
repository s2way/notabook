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
        "-delay [minutes] (optional) Reduce time from now to avoid conflicts, default and minimum is 5\n" +
        "-timeout [seconds] (optional) Timeout to cancel a request, default and minimum is 5\n" +
        "-api [url] (optional) The endpoint api address\n" +
        "-port (optional) The endpoint port, default 80\n" +
        "-limit (optional) Simultaneous request limit, default 10\n" +
        "-interval [milliseconds] (optional) Loop interval for retry attempt, default and minimum is 10\n");
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
let timeout = argv.timeout || process.env.NOTABOOK_TIMEOUT;
if (!timeout || timeout < 5) timeout = C.DEFAULT_TIMEOUT;
let api = argv.api || process.env.NOTABOOK_API || C.API_URL;
let port = argv.port || process.env.NOTABOOK_PORT;
if (!port || port < 0) port = 80;
let limit = argv.limit || process.env.NOTABOOK_LIMIT;
if (!limit || limit < 10) limit = 10;
let interval= argv.interval || process.env.NOTABOOK_INTERVAL;
if (!interval || interval < 10) interval = 10;

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
    };
    logger.add(logger.transports.Console, configure);
}

if (['error', 'info', 'debug'].indexOf(logLevel) === -1) logLevel = 'debug';
logger.level = logLevel;

logger.info(`Running parameters`);
logger.info(`Path = ${rootPath}`);
logger.info(`Token = ${token}`);
logger.info(`LogFile = ${(logFile) ? logFile : 'console'}`);
logger.info(`LogLevel = ${logLevel}`);
logger.info(`Delay = ${delay} min`);
logger.info(`Timeout = ${timeout}`);
logger.info(`Api = ${api}`);
logger.info(`Port = ${port}`);
logger.info(`Limit = ${limit}`);
logger.info(`Interval = ${interval} ms`);
logger.info(`Extension = ${C.EXT}`);
logger.info(`DB = ${C.STORAGE}`);

import Finder from './Finder';
import Keeper from './Keeper';
import Indexer from './Indexer';

var finder, keeper, indexer = null;

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

indexer = new Indexer({logger: logger}, {
    hostname: api,
    timeout: timeout,
    method: C.API_METHOD,
    port: port,
    limit: limit,
    token: token,
    interval: interval
});

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
    if (data && data.length) {
        logger.info(`Processing...`);
        indexer.run(data, run);
    } else {
        logger.info(`Nothing to process`);
    }
}

let run = () => {
    logger.debug('Run invoked');
    let lastBatch = keeper.getBatch();
    if (lastBatch && lastBatch.length) {
        lastBatch = JSON.parse(lastBatch);
        logger.info('Batch has found data, reprocessing');
        _process(lastBatch);
    } else {
        _search();
    }
}

run();