import { Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../../.env.auth' });
import * as fs from 'fs';
import * as path from 'path';

export function jwtEncode(role: any) {

    try {
        // information to be encoded in the JWT
        const payload = {
            role: role,
            iat: new Date().getTime()
        };
        // read private key value
        // const privateKey = process.env.secretkey;
        const privateKey = {
            key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8'),
            passphrase: process.env.passphrase
        };
        const signInOptions: SignOptions = {
            // RS256 uses a public/private key pair. The API provides the private key
            // to generate the JWT. The client gets a public key to validate the
            // signature
            algorithm: 'RS256',
            expiresIn: '365d'
        };
        return sign(payload, privateKey, signInOptions);
    } catch (error) {
        console.log(error);
    }

}

// export function jwtDecode(req: Request, res: Response, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         Jwt.verify(req.headers.authorization.split(' ')[1], process.env.secretkey, function (err, decode) {
//             if (err) req.user = undefined;
//             req.user = decode;
//             next();
//         });
//     } else {
//         req.user = undefined;
//         next();
//     }
// }