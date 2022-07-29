import { Request, Response } from 'express';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../../.env.auth' });
import * as fs from 'fs';
import * as path from 'path';

interface TokenPayload {
    role: string
  }

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
            key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8') || process.env.secretkey,
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

export function validateToken(req, res, next) {
    var token = req.headers.authorization?.split(' ')[1];

    if(token){
        const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem')) || process.env.publickey;
  
        const verifyOptions: VerifyOptions = {
          algorithms: ['RS256'],
        };
      
        req.body.payload = verify(token, publicKey, verifyOptions);
        
    }
    next();
  }