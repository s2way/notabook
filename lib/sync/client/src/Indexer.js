'use strict'

var logger, http, qs, fs, x2j = null;

class Indexer {

    constructor(deps, options) {
        logger = deps.logger;
        http = deps.request || require('http');
        qs = deps.qs || require('querystring');
        fs = deps.fs || require('fs');
        x2j = deps.xml2js || require('xml2js');

        this.limit = options.limit;
        this.token = options.token;
        this.hostname = options.hostname;
        this.method = options.method;
        this.timeout = options.timeout;
        this.port = options.port;
        this.path = options.path || '';
        this.path += `/?token=${qs.escape(this.token)}`;
        this.options = {
            hostname: this.hostname,
            timeout: this.timeout,
            method: this.method,
            port: this.port,
            path: this.path,
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'applicaton/json'
            }
        };

        this.interval = options.interval || 10;

        this.xml = new x2j.Parser();
        this.data = [];
        this.queueClient = [];
        this.inQueue = 0;
        this._buildClient();
    }

    // Build the pool of clients
    _buildClient() {
        for (let i = 0; i < this.limit; i += 1) {
            this.queueClient[i] = this._client(i);
        }
    }

    // Push initial data into the queue to send
    _initQueue() {
        let initial = (this.limit > this.data.length) ? this.data.length : this.limit;
        for (let i = 0; i < initial; i += 1) {
            this._pushData(i);
        };
    }

    // Pop one more data to send and release the client to do it
    _pushData(index) {
        this.inQueue += 1;
        let doc = JSON.stringify(this.data.pop());
        this.queueClient[index].meta.info = JSON.parse(doc);

        fs.readFile(this.queueClient[index].meta.info.path, (error, data) => {
            logger.debug(`Enqueued new data at: ${index}`);
            if (!error) {
                this.xml.parseString(data, (err, result) => {
                    if (!err) {
                        this.queueClient[index].meta.data = JSON.stringify(result);
                        this.queueClient[index].meta.isLocked = false;
                    } else {
                        //TODO: Create a problem list when can't read the XML from path
                        logger.error(`Unable to parse from file: ${path}`);
                    }
                });
            } else {
                logger.error(`Unable to read from file: ${path}`);
                //TODO: Create a problem list when can't read the XML from path
            }
        });
    }

    // Process the data
    run(data, next) {
        if (data) this.data = data;
        if (next) this.next = next;
        if (this.data && this.data.length) {
            logger.info(`# (${data.length}) files to process`);
            this._initQueue();
        } else {
            this._finish();
        }
    }

    // Move application back to callback (perhaps change for events in future)
    _finish() {
        if (this.next instanceof Function) this.next();
    }

    // After successfully indexed a doc try to pick one more or end it if it's done
    _success(index) {
        this.inQueue -= 1;
        this.queueClient[index].meta.info = null;
        logger.debug(`Data at: ${index}, sent and purged`);
        if (this.data.length) {
            this._pushData(index);
        } else {
            if (!this.inQueue) {
                logger.debug(`Nothing left to send, leaving`);
                // this._clear();
                this._finish();
            }
        }
    }

    // Function to destroy all clients
    _clear() {
        for (let i = 0; i < this.limit; i += 1) {
            clearInterval(this.queueClient[i].interval);
        }
    }

    // Calllback error from http, will mark the data to retry
    _error(index) {
        logger.info(`Weird responde at: ${index}, will retry forever`);
        this.queueClient[index].meta.isLocked = false;
    }

    // The worker
    _client(index) {
        // read the file async only once in here
        let runner = (meta) => {
            let index = meta.index;
            let options = meta.options;
            let data = meta.data;

            let request = http.request(options);
            request.on('response', (response) => {
                response.setEncoding('utf8');
                response.on('data', (data) => {
                });
                response.on('end', () => {
                    if (!(/^2/.test('' + response.statusCode))) {
                        return this._error(index);
                    } else {
                        return this._success(index);
                    }
                });
            });
            request.on('error', (error) => {
                logger.error(`Request error: ${error}`)
                this._error(index);
            });

            request.setSocketKeepAlive(true);
            request.setHeader('Content-Length', Buffer.byteLength(data));
            request.end(meta.data);

        };
        let task = {
            meta: {
                isLocked: true,
                index: index,
                info: null,
                options: this.options
            },
            interval: null
        };
        let interval = setInterval((meta) => {
            logger.debug(`Running for index ${meta.index} - queue ${this.inQueue} - remaining ${this.data.length}`);
            if (!meta.isLocked) {
                meta.isLocked = true;
                if (meta.info) {
                    runner(meta);
                } else {
                    meta.isLocked = false;
                }
            } else {
                logger.debug(`Locked for index: ${meta.index}`);
            }
        }, this.interval, task.meta);
        task.interval = interval;
        return task;
    }
}

module.exports = Indexer;