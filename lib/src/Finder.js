'use strict'

var fs, path, FindFiles, moment, C, logger, finderObj = null;

export default class Finder {

    constructor(deps, extension, rootPath) {
        logger = deps.logger;
        C = deps.constants || require('./constants');
        fs = deps.fs || require('fs');
        path = deps.path || require('path');
        FindFiles = deps.FindFiles || require('node-find-files');
        moment = deps.moment || require('moment');
        finderObj = deps.finderObj || {
                rootFolder : rootPath,
                filterFunction: (filePath, stat) => {
                    if (path.extname(filePath) !== extension) return false;
                    return true;
                }
            };

        if (extension.indexOf('.') == -1) throw new Error(`${ERROR_EXT} [${extension}]`);
        try {
            fs.accessSync(rootPath, fs.F_OK);
        } catch (e) {
            throw new Error(`${ERROR_PATH} [${rootPath}]`)
        }
        this.ext = extension;
        this.path = path;
        this.isSearching = false;
        this.batch = [];
        this.next = null;
        this.finder = new FindFiles(finderObj);
        this.finder.on("match", function(strPath, stat) {
            logger.debug(strPath + " - " + stat.mtime);
            stat.path = strPath;
            this.batch.push(stat);
        });
        this.finder.on('complete', function() {
            logger.notice(`Finished at: ${new Date()}`);
            this._setIsSearching(false);
            this.next(this.batch);
        });

        this.finder.on('patherror', function(err, strPath) {
            logger.error(`Error for path: ${strPath} - ${err}`);
        });

        this.finder.on('error', function(err) {
            logger.error(`Global error ${err}`);
        });
    }

    _clearBatch() {
        this.batch = [];
    }

    _setIsSearching(value) {
        this.isSearching = value;
    }

    search(next) {
        if (this.isSearching) {
            logger.info(`Wait for last searching to end.`);
            return false;
        } else {
            this._clearBatch();
            this._setIsSearching(true);
            logger.notice(`Started at: ${new Date()}`);
            this.next = next;
            this.finder.startSearch();
            return true;
        }
    }
}