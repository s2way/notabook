'use strict'

var fs, path, FindFiles, moment, C, logger, finderObj = null;

class Finder {

    constructor(deps) {
        logger = deps.logger;
        C = deps.constants || require('./constants');
        fs = deps.fs || require('fs');
        path = deps.path || require('path');
        FindFiles = deps.FindFiles || require('node-find-files');
        moment = deps.moment || require('moment');
        this.isSearching = false;
    }

    _setIsSearching(value) {
        this.isSearching = value;
    }

    search(options, next) {
        if (this.isSearching) {
            logger.info(`Wait for last searching to end.`);
            return false;
        } else {
            this._setIsSearching(true);
            let batch = [];
            let started = new Date();
            if (!finderObj) finderObj = {
                    rootFolder : options.rootPath,
                    filterFunction: (filePath, stat) => {
                        if (path.extname(filePath) !== options.extension) return false;
                        let mtime = moment(new Date(stat.mtime));
                        if (mtime.isBetween(options.from, options.to)) return true;
                        return false;
                    }
                };
            try {
                fs.accessSync(options.rootPath, fs.F_OK);
            } catch (e) {
                logger.error(`${C.ERROR_PATH} [${rootPath}]`);
                this._setIsSearching(false);
                return false;
            }
            let finder = new FindFiles(finderObj);
            finder.on('match', (strPath, stat) => {
                logger.debug(`${strPath} - ${stat.mtime}`);
                let data = {};
                data.path = strPath;
                data.size = stat.size;
                data.mtime = stat.mtime;
                batch.push(data);
            });
            finder.on('complete', () => {
                let finished = new Date();
                logger.info(`Finished at: ${finished}`);
                this._setIsSearching(false);
                next(batch, {started: started, finished: finished, date: options.to});
            });
            finder.on('patherror', (err, strPath) => {
                logger.error(`Path: ${strPath} - ${err}`);
            });
            finder.on('error', (err) => {
                logger.error(`Global problem ${err}`);
            });
            logger.info(`Started  at: ${started}`);
            finder.startSearch();
            return true;
        }
    }
}

module.exports = Finder;