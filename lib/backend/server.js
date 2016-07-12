import restify from 'restify';
import fs from 'fs';
import path from 'path';
import UploadTranslator from './upload/Translator';

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
server.use(restify.bodyParser());

function _upload(req, res, next) {
    let upload = new UploadTranslator();
    switch(req.params.type) {
        case 'pfx':
            upload.pfx(req, res, next);
            break;
        default:
            res.send(404);
            return next();
            break;
    }
}

server.get('/test', function(req, res, next) {
    res.end(pack.name + '\n' + pack.version + '\n');
    return next();
});

server.put('/upload/:type', (req, res, next) => {
    _upload(req, res, next);
});

server.listen(4004, function() {
    console.log('Server listening at 4004');
});