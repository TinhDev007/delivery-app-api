import { User} from "../models/main.model";
import { Request, Response } from 'express';
import { Http } from "../middlewares/httpResponse";
import { jwtEncode } from "../middlewares/jwtAuth.middleware";
export class UserController{

    public async signUpNewUser (req: Request, res: Response) {
        try {
            await new User().insertOne(req.body);
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

    public async logInUser (req: Request, res: Response) {
        try {
            var form = `id`;
            var data = (await new User().selectByEmail(req.body, form));
            if(data.length){
                data[0].token=jwtEncode(data[0].id, data[0].email, 'user');
                data[0].role='user';
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

    public async readAllUser (req: Request, res: Response){
        try {
            res.status(Http.OK.status).send({
                data: await new User().selectAll()
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    public async readUserById (req: Request, res: Response){
        try {
            res.status(Http.OK.status).send({
                data: await new User().selectById(req.params)
            });
        } catch (error) {
            res.status(Http.Failed.status).send(Http.Failed);
        }
    }

    // public async updateOneCategory (req: Request, res: Response){
    //     try {
    //         if(Number.isInteger(parseInt(req.params.category_id)))
    //             res.status(Http.OK.status).send({
    //                 data: (await new User().updateOne(
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
    //             await new User().deleteOne(parseInt(req.params.category_id));
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