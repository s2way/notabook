'use strict'

var logger, http, qs = null;

class Indexer {

    constructor(deps, options, data, next) {
        logger = deps.logger;
        http = deps.request || require('http');
        qs = deps.qs || require('querystring');

        this.limit = options.limit;
        this.token = options.token;
        this.hostname = options.hostname;
        this.method = options.method;
        this.timeout = options.timeout;
        this.port = options.port;

        this.queueData = [];
        this.queueClient = [];
        this.inQueue = 0;
        this.data = data;
        this.next = next;
        this._buildQueue();
    }

    run() {
        if (this.data && this.data.length) {
            this._initQueue();
            this._process();
        } else {
            this._finish();
        }
    }

    _finish() {
        if (this.next instanceof Function) this.next({error: 'No data to process'});
    }

    _process() {
        console.log('process...');
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
                this.queueData[i] = JSON.stringify(doc);
                console.log(`Indexing: ${i}`);
                this.queueClient[i].end(this.queueData[i]);
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
        console.log(`success index : ${index}`);
        this.inQueue -= 1;
        this.queueData[index] = null;
        if (this.queueData.length) {
            this._move(1);
        } else {
            this._finish();
        }
    }

    _error(index) {
        this.queueClient[index].end(this.queueData[index]);
        console.log(`error index : ${index}`);
    }

    _client(index) {
        let options = {
            hostname: this.hostname,
            timeout: this.timeout,
            method: this.method,
            port: this.port,
            path: `/?token=${qs.escape(this.token)}`
        }
        let request = http.request(options);
        request.on('error', (error) => {
            console.log(`error ${error}`);
            this._error(index);
        });
        request.on('data', (response) => {
            console.log(response);
        });
        request.on('end', () => {
            console.log('-----------');
            if (!(/^2/.test('' + response.statusCode))) {
                this._success(index);
            } else {
                console.log('status code not 200');
                this._error(index);
            }
        });
        request.on('abort', (error) => {
            console.log(`error ${error}`);
            this._error(index);
        });

        return request;
    }
}

module.exports = Indexer;