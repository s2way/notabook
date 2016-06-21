'use strict'

var logger, http, qs = null;

class Indexer {

    constructor(deps, options) {
        logger = deps.logger;
        http = deps.request || require('http');
        qs = deps.qs || require('querystring');

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

        this.queueData = [];
        this.queueClient = [];
        this.inQueue = 0;
        this._buildQueue();
    }

    run(data, next) {
        if (data) this.data = data;
        if (next) this.next = next;
        if (this.data && this.data.length) {
            this._initQueue();
        } else {
            this._finish();
        }
    }

    _finish() {
        if (this.next instanceof Function) this.next();
    }

    _buildQueue() {
        for (let x = 0; x < this.limit; x += 1) {
            this.queueData[x] = null;
            this.queueClient[x] = this._client(x);
        }
    }

    _move(many) {
        let doc = null;
        for (let x = 0; x < many; x += 1) {
            doc = this.data.pop();
            this._enqueue(doc);
        }
    }

    _enqueue(doc) {
        for (let i = 0; i < this.limit; i += 1) {
            if (!this.queueData[i]) {
                logger.info(`Enqueued new data at: ${i}`);
                this.queueData[i] = JSON.stringify(doc);
                this.queueClient[i].meta.isLocked = false;
                this.inQueue += 1;
                return true;
            }
        };
        return false;
    }

    _initQueue() {
        let initial = (this.limit > this.data.length) ? this.data.length : this.limit;
        this._move(initial);
    }

    _success(index) {
        this.inQueue -= 1;
        this.queueData[index] = null;
        logger.info(`Data at: ${index}, sent and purged`);
        if (this.data.length) {
            this._move(1);
        } else {
            if (!this.inQueue) {
                // this._clear();
                this._finish();
            }
        }
    }

    _clear() {
        for (let x = 0; x < this.limit; x += 1) {
            clearInterval(this.queueClient[x].interval);
        }
    }

    _error(index) {
        logger.info(`Weird responde at: ${index}`);
        this.queueClient[index].meta.isLocked = false;
    }

    _client(index) {
        // read the file async only once in here
        let runner = (meta) => {
            let index = meta.index;
            let options = meta.options;
            let request = http.request(options);
            request.on('response', (response) => {
                response.setEncoding('utf-8');
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
            request.setHeader('Content-Length', Buffer.byteLength(meta.data));
            request.end(meta.data);
        };
        let task = {
            meta: {
                isLocked: true,
                index: index,
                data: this.queueData[index],
                options: this.options
            },
            interval: null
        };
        let interval = setInterval((meta) => {
            logger.debug(`Running for index ${meta.index}`);
            if (!meta.isLocked) {
                meta.isLocked = true;
                if (this.queueData[meta.index]) {
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