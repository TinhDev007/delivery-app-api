import {Request, Response} from "express";
import { 
    MerchantController, 
    CategoryController 
} from "../controllers/mainController";



export class Routes {

    public MerchantController: MerchantController = new MerchantController();
    public CategoryController: CategoryController = new CategoryController();

    public routes(app): void{
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Test API successfully!'
            });
        });
        
        app.route('/merchants/create')
        .post(this.MerchantController.createNewMerchant);
        app.route('/merchants')
        .get(this.MerchantController.readAllMerchant);
        app.route('/merchants/:merchant_id')
        .put(this.MerchantController.updateOneMerchant)
        .delete(this.MerchantController.deleteOneMerchant);  

        app.route('/categories/create')
        .post(this.CategoryController.createNewCategory);
        app.route('/categories')
        .get(this.CategoryController.readAllCategory);
        app.route('/categories/:category_id')
        .put(this.CategoryController.updateOneCategory)
        .delete(this.CategoryController.deleteOneCategory);

    }
}