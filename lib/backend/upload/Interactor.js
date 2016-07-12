export default class UploadInteractor {

    constructor (deps = {}) {
        this.Entity = deps.Entity || require('./Entity').default
    }

    savePfxTmpFile (fileData) {
        let uploadEntity = new this.Entity();
        return uploadEntity.savePfxTmpFile(fileData);
    }
}