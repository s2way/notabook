export default class PfxAdapter {

    constructor(deps = {}) {
        this.Couchbase = deps.Couchbase || require('couchnode-pro').default;
        this.config = deps.config || require('../../config').couchbase;
        this.db = new this.Couchbase({
            cluster: this.config.cluster,
            bucket: this.config.buckets.notabook.name,
            password: this.config.buckets.notabook.password
        });
    }

    read(input) {
        return this.db.read(input);
    }

    save(input) {
        let {key, data} = input;
        return this.db.upsert(key, data);
    }

}