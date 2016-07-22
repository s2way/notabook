import Joi from 'joi';
import uuid from 'node-uuid';
import crypto from 'crypto';

export default class PfxEntity {

    constructor(deps = {}) {
        this.PfxAdapter = deps.PfxAdapter || require('./Adapter').default;
        this.pk12s = deps.openssl || require('../utils/openssl').pkcs12
    }

    isValid(input) {
        return new Promise((resolve, reject) => {
            let schema = Joi.object().keys({
                token: Joi.string().required(),
                path: Joi.string().min(1).required(),
                hash: Joi.string().min(1).required(),
                password: Joi.string().min(1).required(),
                content: Joi.binary().min(1).required()
            });
            let result = Joi.validate(input, schema);
            if (result.error) {
                let outputMessage = {
                    error: {
                        name: 'ValidationError',
                        messages: result.error.details.map(e => e.message)
                    }
                };
                reject(outputMessage);
            } else {
                resolve(result.value);
            }
        });
    }

    matchPass(input) {
        return this.pk12s.matchPass(input);
    }

    save(input) {
        let adapter = new this.PfxAdapter;
        let key = `token:${input.token}`;
        return adapter.read(key)
            .then((output) => {
                let token = output.value;
                let certificates = token.certificates || [];
                let position = null;
                certificates.forEach((value, index) => {
                    if(value.hash === input.hash) position = index;
                });
                if(!position) {
                    let cipher = crypto.createCipher('aes192', input.hash.substr(0, 8));
                    let encrypted = cipher.update(input.password, 'utf8', 'hex');
                    encrypted += cipher.final('hex');
                    let pfx = {
                        key: `pfx:${uuid.v4()}`,
                        data: input.content
                    };
                    let certificate = {
                        key: pfx.key,
                        hash: input.hash,
                        password: encrypted
                    };
                    certificates.push(certificate);
                    token['certificates'] = certificates;
                    // TODO: Implement save of token by its own entity not pfx adapter
                    return adapter.save({key: key, data: token})
                        .then(() => {
                            return adapter.save(pfx);
                        });
                }
            })
    }
}