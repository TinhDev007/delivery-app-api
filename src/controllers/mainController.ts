import { Merchant } from "../models/mainModel";
import { Request, Response } from 'express';
import { Http } from "./httpResponse";
// const Contact = mongoose.model('Contact', ContactSchema);

export class MerchantController{

    public async createNewMerchant (req: Request, res: Response) {
        try {
            new Merchant().insertOne(req.body);
            res.status(Http.OK.status).send(Http.OK);
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllMerchant (req: Request, res: Response){
        try {
            res.status(Http.OK.status).send({
                data: await new Merchant().selectAll(),
                status: Http.OK.status,
                statusText: Http.OK.statusText
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async updateOneMerchant (req: Request, res: Response){
        try {
            await new Merchant().updateOne(req.body);
            res.status(Http.OK.status).send(Http.OK);
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async deleteOneMerchant (req: Request, res: Response) {
        try {
            if(req.body.id)
                await new Merchant().deleteOne(req.body.id);
            else
                throw Http.BadRequest;
                res.status(Http.OK.status).send(Http.OK);
        } catch (error) {
            if(error.status==Http.BadRequest.status)
                res.status(Http.OK.status).send(Http.OK);
            else
                res.status(Http.Failed.status).send(Http.Failed);
        }
    }
}