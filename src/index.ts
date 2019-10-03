import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as Models from './models';

export function JwtCreation(config: Models.IConfig) {
    const algo: string = config.env ? config.env.jwtAlgo || 'RS256' : 'RS256';
    const privateKey: string = config.env ? config.env.jwtPrivateKey || '' : '';

    return {
        /**
         * @param   {object}        options
         * @param   {object}        [options.claims]
         * @param   {string}        [options.issuer]
         * @param   {object}        [options.privateKey]
         * @param   {object}        [options.algo]
         * @param   {object}        [options.expires]
         * @returns {string}
         */
        generateToken: (options: Models.IOptions): string => {
            const thisPrivateKey: string = options.privateKey || privateKey;
            const thisAlgo: string = options.algo || algo;
            const expires: string = options.expires || '1 day';
            const claims: object = options.claims || {};
            let privateKeyContent: string;

            if (!thisPrivateKey) {
                throw new Error('Could not generate JWT: Private Key is not specified!');
            } else {
                try {
                    if (thisPrivateKey.indexOf('-----BEGIN') === 0) {
                        // Variable is the key itself
                        privateKeyContent = thisPrivateKey;
                    } else {
                        privateKeyContent = fs.readFileSync(thisPrivateKey).toString();
                    }
                } catch (err) {
                    throw new Error('Could not generate JWT: Error opening private key: ' + err.message);
                }
            }

            return jwt.sign(claims, privateKeyContent, {
                algorithm: thisAlgo,
                expiresIn: expires,
                issuer: options.issuer || 'cypress.testing',
            });
        }
    };
}
