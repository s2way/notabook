'use strict'
import {spawn} from 'child_process'

const pk12sTestPass = function (input) {
    return new Promise((resolve, reject) => {
        let pass = input.password || '';
        let cmd = spawn('openssl', ['pkcs12', '-nokeys', '-password', 'pass:' + pass, '-in', input.path]);
        let regex = /[0-9]{14}/
        cmd.on('close', (code) => {
            if (code === 0) return resolve(input);
            reject('Error: Invalid certificate password');
        });
        cmd.stdout.on('data', (data) => {
            if (data) {
                let result = data.toString().match(regex);
                if (result && result.length) {
                    if (result[0].length) {
                        input._taxPayer = result[0];
                    }
                }
            }
        });
    });
};

export const pkcs12 = {
    matchPass: pk12sTestPass
};