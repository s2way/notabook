import fs from 'fs';
import os from 'os';
import path from 'path';
import restify from 'restify';
import UploadTranslator from 'pfx/Translator';

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

server.use(restify.bodyParser({
    maxBodySize: 524288,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: true,
    uploadDir: os.tmpdir(),
    multiples: true,
    hash: 'sha1'
}));

server.get('/info', function(req, res, next) {
    res.json({
        app: pack.name,
        version: pack.version
    });
    return next();
});

function _upload(req, res, next) {
    let upload = new UploadTranslator();
    switch(req.params.destination) {
        case 'pfx':
            upload.pfx(req, res, next);
            break;
        default:
            res.send(404);
            return next();
            break;
    }
}

server.put('/pfx/:destination', _upload);

server.listen(4004, function() {
    console.log('Server listening at 4004');
});