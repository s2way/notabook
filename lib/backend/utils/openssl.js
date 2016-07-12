'use strict'

import path from 'path'
import {spawn} from 'child_process'

const pk12sTestPass = function (src, password) {
    return new Promise((resolve, reject) => {
        let pass = password || '';
        if (typeof src === 'string') {
            let cmd = spawn('openssl', ['pkcs12', '-noout', '-password', 'pass:' + pass, '-in', path.resolve(src)]);
            cmd.on('close', (code) => {
                if (code === 0) return resolve(true);
                reject('Error: Executing command' + code);
            });
        } else {
            reject('Error: Data should be a file or buffer');
        }
    });
};

export const pk12s = {
    isValidPassword: pk12sTestPass
};