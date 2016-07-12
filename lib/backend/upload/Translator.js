export default class UploadTranslator {

    constructor(deps = {}) {
        this.Interactor = deps.Interactor || require('./Interactor').default;
    }

    _respond(res, data, next) {
        res.json(data.statusCode, data.message);
        return next();
    }

    pfx(req, res, next) {
        let uploadInteractor = new this.Interactor;
        let inputMessage = req && req.body

        if (!inputMessage) {
           return this._respond(res, {statusCode: 404, message: 'Missing data'}, next);
        }

        uploadInteractor.savePfxTmpFile(inputMessage)
            .then((outputMessage) => {
                this._respond(res, {statusCode: 200, message: outputMessage}, next);
            })
            .catch((outputMessage) => {
                this._respond(res, {statusCode: 400, message: outputMessage}, next);
            })
    }
}