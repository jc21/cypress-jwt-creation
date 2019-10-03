import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import {JwtCreation} from './index';

const publicKey = fs.readFileSync('./testing/public.key').toString();

test('test token generation', async () => {
    const jwtc = JwtCreation({
        env: {
            jwtAlgo: 'RS256',
            jwtPrivateKey: './testing/private.key'
        }
    });

    const token = jwtc.generateToken({
        claims: {
            name: 'admin'
        },
        issuer: 'jest tester'
    });

    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(50);

    // Decode the token
    const data: any = await new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, {ignoreExpiration: false, algorithms: ['RS256']}, (err, result) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    reject(new Error('Token has expired: ' + err.message));
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });

    expect(typeof data).toBe('object');
    expect(data.name).toBe('admin');
    expect(data.iss).toBe('jest tester');
});
