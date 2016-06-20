'use strict'

var assert = require('assert');
import 'babel-polyfill';
import Indexer from './../../lib/client/src/Indexer';

describe('Class Indexer', () => {
    var options, data = null;
    beforeEach(() => {
        options = {
            limit : 1000,
            token: 'testToken',
            hostname: '127.0.0.1',
            method: 'POST',
            timeout: 10000,
            port: 8008
        };
        data = [
            {path: '/tmp/0'},
            {path: '/tmp/1'}
        ]
    });

    describe('Contructor()', () => {
        it('should return build a queue of limit size', () => {
            let indexer = new Indexer({}, options);
            assert.equal(indexer.queueData.length, options.limit);
        });
    });
    describe('Run()', () => {
        it('should load the first queue with the data inside', (done) => {
            let indexer = new Indexer({}, options, Object.assign([], data));
            indexer.run();
            assert.equal(indexer.queueData[1], JSON.stringify(data[0]));
            assert.equal(indexer.queueData[0], JSON.stringify(data[1]));
            done();
        });
        it('should post data to endpoint', (done) => {
            let indexer = new Indexer({}, options, Object.assign([], data, done));
            indexer.run();
        });
    });
});