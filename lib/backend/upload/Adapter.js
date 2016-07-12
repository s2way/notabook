export default class UploadAdapter {

    constructor(deps = {}) {
        this.fs = deps.fs || require('fs');
        this.path = deps.path || require('path');
        this.config = deps.config || require('../../config.js').config;
    }

    save(file) {
        return new Promise((resolve, reject) => {
            let filePath = this.config.path.pfxTmpFolder + file.name + '.pfx';
            let isBuffer = Buffer.isBuffer(file.data);
            let options = {};
            let fileData = isBuffer ? Buffer.from(file.data) : file.data.toString();
            if (!isBuffer) options.encoding = 'utf8';
            this.fs.writeFile(this.path.resolve(filePath), fileData, options, (error) => {
                if (error) return reject('Error: ' + error);
                resolve(filePath);
            });
        });
    }
}