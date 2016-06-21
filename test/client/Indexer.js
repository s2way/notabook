'use strict'

var assert = require('assert');
import 'babel-polyfill';
import http from 'http';
import url from 'url';
import Indexer from './../../lib/client/src/Indexer';

describe('Class Indexer', () => {
    var optionsTest, dataTest, logger = null;

    before(() =>{
        http.createServer((req, res) => {
            switch(url.parse(req.url).pathname) {
               case '/error':
                   res.writeHead(200);
                   res.end();
                   break;
               case '/abort':
                   res.abort();
                   break;
               case '/ok/':
                   res.writeHead(200);
                   res.end();
                   break;
               default:
                   res.writeHead(200);
                   res.end();
                   break;
            };
        }).listen(8008);

        logger = {
            info: (msg) => {
                console.log(msg);
            },
            error: (msg) => {
                console.log(msg);
            },
            debug: (msg) => {
                console.log(msg);
            }
        };
    });

    beforeEach(() => {
        optionsTest = {
            limit : 4,
            token: 'testToken',
            hostname: '127.0.0.1',
            method: 'POST',
            timeout: 1000,
            port: 8008,
            interval: 10
        };
        dataTest = [
            {path: '/tmp/0'},
            {path: '/tmp/1'}
        ]
    });

    describe('Contructor()', () => {
        it('should return build a queue of limit size', () => {
            let options = Object.assign({}, optionsTest);
            let indexer = new Indexer({}, optionsTest);
            assert.equal(indexer.queueData.length, options.limit);
        });
    });
    describe('Run()', () => {
        it('should load the first queue with the data inside', () => {
            let deps = {logger: logger};
            let options = Object.assign({}, optionsTest);
            let data = Object.assign([], dataTest);
            let indexer = new Indexer(deps, options);
            indexer.run(data);
            assert.equal(indexer.queueData[1], JSON.stringify(dataTest[0]));
            assert.equal(indexer.queueData[0], JSON.stringify(dataTest[1]));
        });
        it('should post data to endpoint and end process if all ok', (done) => {
            let deps = {logger: logger};
            let options = Object.assign({}, optionsTest);
            let data = Object.assign([], dataTest);
            options.path = '/ok';
            let indexer = new Indexer(deps, options);
            indexer.run(data, done);
        });
        it('should not end if request fail', (done) => {
            let deps = {logger: logger};
            let options = Object.assign({}, optionsTest);
            let data = Object.assign([], dataTest);
            options.path = '/error';
            let indexer = new Indexer(deps, options);
            indexer.run(data, done);
        });
    });
});