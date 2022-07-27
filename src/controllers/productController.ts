import { Product } from "../models/mainModel";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";


export class ProductController {

    public async createNewProduct(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: (await new Product().insertOne(req.body, req.files))["raw"][0]
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllProduct(req: Request, res: Response) {
        try {
            res.status(Http.OK.status).send({
                data: await new Product().selectAll()
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }
    
    public async readAllProductByMerchantId(req: Request, res: Response) {
        try {
            if (Number.isInteger(parseInt(req.params.merchant_id)))
                res.status(Http.OK.status).send({
                    data: await new Product().selectByMerchantid(parseInt(req.params.merchant_id))
                });
            else
                throw Http.BadRequest;

        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async updateOneProduct(req: Request, res: Response) {
        try {
            if (Number.isInteger(parseInt(req.params.product_id)))
                
                res.status(Http.OK.status).send({
                    data: (await new Product().updateOne(
                        req.body,
                        req.files,
                        parseInt(req.params.product_id)
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

    public async deleteOneProduct(req: Request, res: Response) {
        try {

            if (Number.isInteger(parseInt(req.params.product_id)))
                await new Product().deleteOne(parseInt(req.params.product_id));
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