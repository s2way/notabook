export default class UploadEntity {

    constructor (deps = {}) {
        this.Adapter = deps.Adapter || require('./Adapter').default;
        this.uuid = deps.uuid || require('node-uuid');
    }

    savePfxTmpFile (fileData) {
        let uploadAdapter = new this.Adapter();
        let data = {data : fileData, name: this.uuid.v4()};
        return uploadAdapter.save(data);
    }
}