import {Request, Response} from "express";
import { MerchantController } from "../controllers/mainController";



export class Routes {
    public MerchantController: MerchantController = new MerchantController();

    public routes(app): void{
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Test API successfully!'
            });
        });
        
        app.route('/mcre')
        .post(this.MerchantController.createNewMerchant);
        app.route('/mvie')
        .post(this.MerchantController.readAllMerchant);
        app.route('/mudt')
        .post(this.MerchantController.updateOneMerchant);
        app.route('/mdel')
        .post(this.MerchantController.deleteOneMerchant);

        // app.route('/ccre')
        // .post(this.MerchantController.createNewMerchant);
        // app.route('/cvie')
        // .post(this.MerchantController.readAllMerchant);
        // app.route('/cudt')
        // .post(this.MerchantController.updateOneMerchant);
        // app.route('/cdel')
        // .post(this.MerchantController.deleteOneMerchant);

    }
}