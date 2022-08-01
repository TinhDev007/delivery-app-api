import { Merchant } from "../models/main.model";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";
import { jwtEncode } from "../middlewares/jwtAuth.middleware";

export class MerchantController {

    public async signUpNewMerchant (req: Request, res: Response) {
        try {
            await new Merchant().insertOne(req.body, req.files);
            res.status(Http.OK.status).send({
                status: 200,
                statusText: "Sign up successfully."
            });
        } catch (error) {
            res.status(409).send({
                status: 409,
                statusText: "Email already exists."
            });
        }
    }

    public async logInMerchant (req: Request, res: Response) {
        try {
            var filterform = `
                id
            `;
            var data = (await new Merchant().selectByEmail(req.body, filterform ));
            if(data.length){
                data[0].token=jwtEncode(data[0].id, data[0].email, 'merchant');
                data[0].role='merchant';
                res.status(Http.OK.status).send({
                    data: data[0]
                });
            }     
            else
                res.status(409).send({
                    status: 409,
                    statusText: "Wrong Email. Please check your email again."
                });
                
        } catch (error) {
            console.log(error);
            res.status(Http.BadRequest.status).send(Http.BadRequest);
        }
    }
    
    public async createNewMerchant(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: (await new Merchant().insertOne(req.body, req.files))["raw"][0]
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllMerchant(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: await new Merchant().selectAll()
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllMerchantById(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: await new Merchant().selectById(req.params.merchant_id)
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async updateOneMerchant(req: Request, res: Response) {
        try {
            if (Number.isInteger(parseInt(req.params.merchant_id)))
                
                res.status(Http.OK.status).send({
                    data: (await new Merchant().updateOne(
                        req.body,
                        req.files,
                        parseInt(req.params.merchant_id)
                    ))["raw"][0]
                });
            else
                throw Http.BadRequest;


        } catch (error) {
            if (error.status == Http.BadRequest.status)
                res.status(Http.BadRequest.status).send(Http.BadRequest);
            else
                res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async deleteOneMerchant(req: Request, res: Response) {
        try {

            if (Number.isInteger(parseInt(req.params.merchant_id)))
                await new Merchant().deleteOne(parseInt(req.params.merchant_id));
            else
                throw Http.BadRequest;
            res.status(Http.OK.status).send(Http.OK);
        } catch (error) {
            if (error.status == Http.BadRequest.status)
                res.status(Http.BadRequest.status).send(Http.BadRequest);
            else
                res.status(Http.Failed.status).send(Http.Failed);
        }
    }
}