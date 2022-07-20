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
        app.put('/merchants/:merchant_id', this.MerchantController.updateOneMerchant, upload.single('image'))
        app.route('/merchants/:merchant_id')
        .delete(this.MerchantController.deleteOneMerchant);  

        app.post('/categories/create', this.CategoryController.createNewCategory, upload.single('image'));
        app.route('/categories')
        .get(this.CategoryController.readAllCategory);
        app.put('/categories/:category_id', this.CategoryController.updateOneCategory, upload.single('image'))
        app.route('/categories/:category_id')
        .delete(this.CategoryController.deleteOneCategory);

    }
}