export default class PfxInteractor {

    constructor (deps = {}) {
        this.PfxEntity = deps.PfxEntity || require('./Entity').default;
    }

    save(input) {
        let entity = new this.PfxEntity;
        return entity.matchPass(input)
            .then((output) => entity.isValid(input))
            .then((output) => entity.save(output));
    }
}