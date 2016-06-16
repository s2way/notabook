'use strict'

var Storage, logger, C = null;

class Keeper {

    constructor(deps, path) {
        logger = deps.logger;
        C = deps.constants || require('./constants');
        Storage = deps.storage || require('node-localstorage').LocalStorage;
        this.db = new Storage(path);
    }

    setLastDate(value) {
        this.db.setItem(C.LAST_DATE, value);
    }

    getLastDate(key) {
        this.db.getItem(C.LAST_DATE);
    }
}

module.exports = Keeper;