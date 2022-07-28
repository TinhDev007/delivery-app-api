import {Application, Request, Response} from "express";
import multer = require("multer");
import { 
    AdminController,
    UserController,
    MerchantController, 
    CategoryController,
    ProductController,
    ProductGroupController
} from "../controllers/main.controller";
import { roleChecking } from "../middlewares/jwtAuth.middleware";

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
        //--Login - Roles allowed: unknown guess
        app.post('/admins/login', roleChecking('none'), this.AdminController.logInAdmin);


        //USER
        //--Signup - Roles allowed: unknown guess
        app.post('/users/signup', roleChecking('none'), this.UserController.signUpNewUser);
        //--Login - Roles allowed: unknown guess
        app.post('/users/login', roleChecking('none'), this.UserController.logInUser);


        //MERCHANT
        //--Signup - Roles allowed: unknown guess
        app.post('/merchants/signup', roleChecking('none'), this.MerchantController.signUpNewMerchant, upload.single('image'));
        //--Login - Roles allowed: unknown guess
        app.post('/merchants/login', roleChecking('none'), this.MerchantController.logInMerchant);
        //--Create - Roles allowed: admin, merchant
        app.post('/merchants/create', 
          roleChecking('admin', 'merchant'), 
          this.MerchantController.createNewMerchant, upload.single('image')
        );
         //--Read - Roles allowed: admin, merchant
        app.route('/merchants')
        .get(
          roleChecking('admin', 'merchant'), 
          this.MerchantController.readAllMerchant);
        //--Update - Roles allowed: admin, merchant
        app.put('/merchants/:merchant_id', 
          roleChecking('admin', 'merchant'), 
          this.MerchantController.updateOneMerchant, upload.single('image'))
        //--Delete - Roles allowed: admin, merchant
        app.route('/merchants/:merchant_id')
        .delete(
          roleChecking('admin', 'merchant'), 
          this.MerchantController.deleteOneMerchant);  


        //CATEGORY
        //--Create - Roles allowed: admin
        app.post('/categories/create', roleChecking('admin'), this.CategoryController.createNewCategory, upload.single('image'));
        //--Read - Roles allowed: admin
        app.route('/categories')
        .get(roleChecking('admin'), this.CategoryController.readAllCategory);
        //--Update - Roles allowed: admin
        app.put('/categories/:category_id', roleChecking('admin'), this.CategoryController.updateOneCategory, upload.single('image'))
        //--Delete - Roles allowed: admin
        app.route('/categories/:category_id')
        .delete(roleChecking('admin'), this.CategoryController.deleteOneCategory);


        //PRODUCT
        //--Create - Roles allowed: admin, merchant
        app.post('/products/create', roleChecking('admin', 'merchant'), this.ProductController.createNewProduct, upload.single('image'));
        //--Read - Roles allowed: admin, merchant
        app.route('/products')
        .get(roleChecking('admin', 'merchant'), this.ProductController.readAllProduct);
        //--Read by merchantid - Roles allowed: admin, merchant
        app.route('/products/:merchant_id')
        .get(roleChecking('admin', 'merchant'), this.ProductController.readAllProductByMerchantId);
        //--Update - Roles allowed: admin, merchant
        app.put('/products/:product_id', roleChecking('admin', 'merchant'), this.ProductController.updateOneProduct, upload.single('image'))
        //--Delete - Roles allowed: admin, merchant
        app.route('/products/:product_id')
        .delete(roleChecking('admin', 'merchant'), this.ProductController.deleteOneProduct);

        
        //PRODUCT GROUP
        //--Create - Roles allowed: admin
        app.post('/productgroups/create', roleChecking('admin'), this.ProductGroupController.createNewProductGroup);
        //--Read - Roles allowed: admin
        app.route('/productgroups')
        .get(roleChecking('admin'), this.ProductGroupController.readAllProductGroup);
        //--Read by merchantid - Roles allowed: admin
        app.route('/productgroups/:merchant_id')
        .get(roleChecking('admin'), this.ProductGroupController.readAllProductGroupByMerchantId);
        //--Update - Roles allowed: admin
        app.put('/productgroups/:productgroup_id', roleChecking('admin'), this.ProductGroupController.updateOneProductGroup)
        //--Delete - Roles allowed: admin
        app.route('/productgroups/:productgroup_id')
        .delete(roleChecking('admin'), this.ProductGroupController.deleteOneProductGroup);

    }
}