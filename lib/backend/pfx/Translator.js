export default class PfxTranslator {

    constructor(deps = {}) {
        this.PfxInteractor = deps.PfxInteractor || require('./Interactor').default;
        this.fs = deps.fs || require('fs');
        this.path = deps.path || require('path');
    }

    _error(res, next, message = '', code = 500) {
        res.json(code, {error: message});
        next();
    }

    upload(req, res, next) {
        if (!req.files) return this._error(res, next, 'File is required');
        let file = req.files.data;
        let password = req.params.password;

        if (!file) return this._error(res, next, 'File is required');
        if (!password) return this._error(res, next, 'Password is required');

        this.fs.readFile(this.path.resolve(file.path), (error, data) => {
            if (error) return this._error(res, next, 'File looks wrong');
            let interactor = new this.PfxInteractor;
            interactor.save({
                path: file.path,
                hash: file.hash,
                token: req.params.token,
                content: data,
                password: password
            })
                .then((output) => {
                    res.json(200, output);
                })
                .catch((error) => {
                    this._error(res, next, error);
                });
        });
    }
}