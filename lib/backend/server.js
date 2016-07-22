import fs from 'fs';
import os from 'os';
import path from 'path';
import restify from 'restify';
import PfxTranslator from './pfx/Translator';

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');

let pack = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));

let server = restify.createServer({
    name: pack.name,
    version: pack.version
});

server.use(restify.CORS());
server.use(restify.queryParser());

server.use(restify.bodyParser({
    maxBodySize: 524288,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: true,
    uploadDir: os.tmpdir(),
    multiples: true,
    hash: 'md5'
}));

server.get('/info', function(req, res, next) {
    res.json({
        app: pack.name,
        version: pack.version
    });
    return next();
});

function _error(res, next, message = '', code = 500) {
    res.json(code, {error: message});
    next();
}

function _upload(req, res, next) {
    let pfx = new PfxTranslator();
    switch(req.params.destination) {
        case 'pfx':
            pfx.upload(req, res, next);
            break;
        default:
            _error(req, next, 'Resource not found');
            return next();
            break;
    }
}

server.put('/upload/:destination', _upload);

server.listen(4004, function() {
    console.log('Server listening at 4004');
});