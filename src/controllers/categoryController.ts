import { Category} from "../models/mainModel";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";

export class CategoryController{

    public async createNewCategory (req: Request, res: Response) {
        try {
            
            res.status(Http.OK.status).send({
                data: (await new Category().insertOne(req.body, req.files))["raw"][0]
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readAllCategory (req: Request, res: Response){
        try {
            res.status(Http.OK.status).send({
                data: await new Category().selectAll()
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async updateOneCategory (req: Request, res: Response){
        try {
            if(Number.isInteger(parseInt(req.params.category_id)))
                res.status(Http.OK.status).send({
                    data: (await new Category().updateOne(
                        req.body, 
                        req.files,
                        parseInt(req.params.category_id))
                        )["raw"][0]
                });
            else
                throw Http.BadRequest;
            
            
        } catch (error) {
            if(error.status==Http.BadRequest.status)
                res.status(Http.BadRequest.status).send(Http.BadRequest);
            else
                res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async deleteOneCategory (req: Request, res: Response) {
        try {
            
            if(Number.isInteger(parseInt(req.params.category_id)))
                await new Category().deleteOne(parseInt(req.params.category_id));
            else
                throw Http.BadRequest;
                res.status(Http.OK.status).send(Http.OK);
        } catch (error) {
            if(error.status==Http.BadRequest.status)
                res.status(Http.BadRequest.status).send(Http.BadRequest);
            else
                res.status(Http.Failed.status).send(Http.Failed);
        }
    }
}