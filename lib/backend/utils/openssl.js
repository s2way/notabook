'use strict'
import {spawn} from 'child_process'

const pk12sTestPass = function (input) {
    return new Promise((resolve, reject) => {
        let pass = input.password || '';
        let cmd = spawn('openssl', ['pkcs12', '-noout', '-password', 'pass:' + pass, '-in', input.path]);
        cmd.on('close', (code) => {
            if (code === 0) return resolve(input);
            reject('Error: Invalid certificate password');
        });
    });
};

export const pkcs12 = {
    matchPass: pk12sTestPass
};