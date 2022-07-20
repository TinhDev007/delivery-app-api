import {Application, Request, Response} from "express";
import multer = require("multer");
import { 
    MerchantController, 
    CategoryController 
} from "../controllers/mainController";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
const upload = multer({ storage: storage })

export class Routes {

    public MerchantController: MerchantController = new MerchantController();
    public CategoryController: CategoryController = new CategoryController();

    public routes(app: Application): void{
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Test API successfully!'
            });
        });
        
        // app.route('/merchants/create')
        app.post('/merchants/create',  this.MerchantController.createNewMerchant, upload.single('image'));
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