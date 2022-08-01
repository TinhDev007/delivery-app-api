import { CommonUser } from "../models/commonUser.model";
import { Http } from "./httpResponse";

export const emailClassifying = () => {
    return async (req, res, next) => {
        try {
            let usr = await new CommonUser().selectByEmail(req.body);
            if(usr.length){
                req.body.role = usr[0].role;
                next();
            }

            else
                res.status(Http.BadRequest.status).send({
                    status: Http.BadRequest.status,
                    statusText: 'Email does not exist'
                });
        } catch (error) {
            console.log(error);
            res.status(Http.Failed.status).send(Http.Failed);
        }
}


}