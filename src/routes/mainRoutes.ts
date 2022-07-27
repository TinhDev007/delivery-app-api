import {Application, Request, Response} from "express";
import multer = require("multer");
import { 
    AdminController,
    UserController,
    MerchantController, 
    CategoryController,
    ProductController,
    ProductGroupController
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

    public AdminController: AdminController = new AdminController();
    public UserController: UserController = new UserController();
    public MerchantController: MerchantController = new MerchantController();
    public CategoryController: CategoryController = new CategoryController();
    public ProductController: ProductController = new ProductController();
    public ProductGroupController: ProductGroupController = new ProductGroupController();

    public routes(app: Application): void{
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Backend API'
            });
        });
        
        //ADMIN
        app.post('/admins/login', this.AdminController.logInAdmin);

        //USER
        app.post('/users/signup', this.UserController.signUpNewUser);
        app.post('/users/login', this.UserController.logInUser);

        //MERCHANT
        app.post('/merchants/create',  this.MerchantController.createNewMerchant, upload.single('image'));
        app.route('/merchants')
        .get(this.MerchantController.readAllMerchant);
        app.put('/merchants/:merchant_id', this.MerchantController.updateOneMerchant, upload.single('image'))
        app.route('/merchants/:merchant_id')
        .delete(this.MerchantController.deleteOneMerchant);  

        //CATEGORY
        app.post('/categories/create', this.CategoryController.createNewCategory, upload.single('image'));
        app.route('/categories')
        .get(this.CategoryController.readAllCategory);
        app.put('/categories/:category_id', this.CategoryController.updateOneCategory, upload.single('image'))
        app.route('/categories/:category_id')
        .delete(this.CategoryController.deleteOneCategory);

        //PRODUCT
        app.post('/products/create', this.ProductController.createNewProduct, upload.single('image'));
        app.route('/products')
        .get(this.ProductController.readAllProduct);
        app.route('/products/:merchant_id')
        .get(this.ProductController.readAllProductByMerchantId);
        app.put('/products/:product_id', this.ProductController.updateOneProduct, upload.single('image'))
        app.route('/products/:product_id')
        .delete(this.ProductController.deleteOneProduct);

        //PRODUCT GROUP
        app.post('/productgroups/create', this.ProductGroupController.createNewProductGroup);
        app.route('/productgroups')
        .get(this.ProductGroupController.readAllProductGroup);
        app.route('/productgroups/:merchant_id')
        .get(this.ProductGroupController.readAllProductGroupByMerchantId);
        app.put('/productgroups/:productgroup_id', this.ProductGroupController.updateOneProductGroup)
        app.route('/productgroups/:productgroup_id')
        .delete(this.ProductGroupController.deleteOneProductGroup);

    }
}