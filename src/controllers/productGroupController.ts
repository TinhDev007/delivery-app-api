import { ProductGroup } from "../models/mainModel";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";


export class ProductGroupController {

    public async createNewProductGroup(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: (await new ProductGroup().insertOne(req.body))["raw"][0]
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllProductGroup(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: await new ProductGroup().selectAll()
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }
    
    public async readAllProductGroupByMerchantId(req: Request, res: Response) {
        try {
            if (Number.isInteger(parseInt(req.params.merchant_id)))
                res.status(Http.OK.status).send({
                    data: await new ProductGroup().selectByMerchantid(parseInt(req.params.merchant_id))
                });
            else
                throw Http.BadRequest;

        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async updateOneProductGroup(req: Request, res: Response) {
        try {
            if (Number.isInteger(parseInt(req.params.productgroup_id)))
                
                res.status(Http.OK.status).send({
                    data: (await new ProductGroup().updateOne(
                        req.body,
                        parseInt(req.params.productgroup_id)
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

    public async deleteOneProductGroup(req: Request, res: Response) {
        try {

            if (Number.isInteger(parseInt(req.params.productgroup_id)))
                await new ProductGroup().deleteOne(parseInt(req.params.productgroup_id));
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