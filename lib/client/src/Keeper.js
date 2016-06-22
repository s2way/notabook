'use strict'

var Storage, logger, C = null;

class Keeper {

    constructor(deps, path) {
        logger = deps.logger;
        C = deps.constants || require('./constants');
        Storage = deps.storage || require('node-localstorage').LocalStorage;
        this.db = new Storage(path);
    }

    setDate(value) {
        logger.debug(`Setting date: ${value}`);
        this.db.setItem(C.LAST_DATE, value);
    }

    getDate() {
        let value = this.db.getItem(C.LAST_DATE);
        logger.debug(`Getting date: ${value}`);
        return value;
    }

    setBatch(value) {
        logger.debug(`Setting data: ${(value) ? value.length : 0} file(s)`);
        if (value.length) {
            this.db.setItem(C.LAST_BATCH, JSON.stringify(value));
        } else {
            this.db.removeItem(C.LAST_BATCH);
        }
    }

    getBatch() {
        let value = this.db.getItem(C.LAST_BATCH);
        value = JSON.parse(value);
        logger.debug(`Getting data: ${(value) ? value.length : 0} file(s)`);
        return value;
    }
}

module.exports = Keeper;