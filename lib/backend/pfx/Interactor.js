export default class PfxInteractor {

    constructor (deps = {}) {
        this.PfxEntity = deps.PfxEntity || require('./Entity').default;
    }

    save(input) {
        let entity = new this.PfxEntity;
        return entity.isValid(input)
            .then((output) => entity.matchPass(output))
            .then((output) => entity.save(output));
    }
}