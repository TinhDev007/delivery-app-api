import { Merchant } from "../models/mainModel";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";


export class MerchantController {

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