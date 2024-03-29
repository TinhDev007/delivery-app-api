// import { Request, Response } from 'express';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../../.env.auth' });
import * as fs from 'fs';
import * as path from 'path';
import { Http } from './httpResponse';
import { findmerchantid } from '../utils/findmerchantid.utils';

const ALGORITHM = 'RS256';
const EXPIRE_TIME = '365d';


export function jwtEncode(id: any, email: any, role: any) {

    try {
        // information to be encoded in the JWT
        const payload = {
            id: id,
            email: email,
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
            algorithm: ALGORITHM,
            expiresIn: EXPIRE_TIME
        };
        return sign(payload, privateKey, signInOptions);
    } catch (error) {
        console.log(error);
    }

}

export async function validateToken(req, res, next) {
    try {
        var token = req.headers.authorization?.split(' ')[1];
        
        if(token){
            const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem')) || process.env.publickey;
    
            const verifyOptions: VerifyOptions = {
            algorithms: [ALGORITHM],
            };
        
            req.body.identify = verify(token, publicKey, verifyOptions);
            
        }
        next();
    } catch (error) {
        res.status(Http.BadRequest.status).send({
            status: Http.BadRequest.status,
            statusText: 'Cannot verify token'
        });
    }
  }

  export const roleChecking = (...allowRoles) => {
    return async (req, res, next) => {
        // console.log(req.headers.authorization);
        try {
           
            const roleList = [...allowRoles];
            if(roleList[0].role=='none') {
                
                next();
            }
            else {
                // const allow = roleList.includes(req.body.identify.role);
                
                let allow: boolean = false;
                for(let ele of roleList){
                    if(!req.headers) {
                        if(ele.role=='none')
                            allow = true;
                    }
                    else if(req.body.identify.role==ele.role){     
                        if(ele.range=='self'){
                            var id = req.params[`${ele.role}_id`] || req.body[`${ele.role}id`] || await findmerchantid(req);                          
                            if(req.body.identify.id==id)
                                allow = true;
                        }
                        else allow = true;
                        
                    }
                }
                
                if(allow) {
                    next();
                }
                else res.status(Http.BadRequest.status).send(Http.BadRequest);
            }
        } catch (error) {
            console.log('Rolechecking Error\n', error);
            res.status(Http.BadRequest.status).send(Http.BadRequest);
        }
        
      }
  }
  
  