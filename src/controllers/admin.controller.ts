import { Admin} from "../models/main.model";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";
import { jwtEncode } from "../middlewares/jwtAuth.middleware";
export class AdminController{

    // public async createNewCategory (req: Request, res: Response) {
    //     try {
            
    //         res.status(Http.OK.status).send({
    //             data: (await new Admin().insertOne(req.body))["raw"][0]
    //         });
    //     } catch (error) {
    //         res.status(Http.Failed.status).send(Http.Failed);
    //     }
    // }

    public async logInAdmin (req: Request, res: Response) {
        try {
            var data = (await new Admin().selectByEmail(req.body));
            if(data.length){
                data[0].token=jwtEncode(data[0].id, data[0].email, 'admin');
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

    // public async updateOneCategory (req: Request, res: Response){
    //     try {
    //         if(Number.isInteger(parseInt(req.params.category_id)))
    //             res.status(Http.OK.status).send({
    //                 data: (await new Admin().updateOne(
    //                     req.body, 
    //                     req.files,
    //                     parseInt(req.params.category_id))
    //                     )["raw"][0]
    //             });
    //         else
    //             throw Http.BadRequest;
            
            
    //     } catch (error) {
    //         if(error.status==Http.BadRequest.status)
    //             res.status(Http.BadRequest.status).send(Http.BadRequest);
    //         else
    //             res.status(Http.Failed.status).send(Http.Failed);
    //     }
    // }

    // public async deleteOneCategory (req: Request, res: Response) {
    //     try {
            
    //         if(Number.isInteger(parseInt(req.params.category_id)))
    //             await new Admin().deleteOne(parseInt(req.params.category_id));
    //         else
    //             throw Http.BadRequest;
    //             res.status(Http.OK.status).send(Http.OK);
    //     } catch (error) {
    //         if(error.status==Http.BadRequest.status)
    //             res.status(Http.BadRequest.status).send(Http.BadRequest);
    //         else
    //             res.status(Http.Failed.status).send(Http.Failed);
    //     }
    // }
}