import {Application, Request, Response} from "express";
import { Http } from "../middlewares/httpResponse";
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
import { ROLE } from "../utils/roles.utils";
import { emailClassifying } from "../middlewares/emailClassifying.middleware";

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

        //AUTH
        //--Signup - Roles allowed: unknown guess
        app.post('/signup', roleChecking(ROLE.NONE), 
          (req: Request, res: Response) => {
            switch (req.body.role) {

              case ROLE.MERCHANT:
                this.MerchantController.signUpNewMerchant(req, res);
                break;
              case ROLE.USER:
                this.UserController.signUpNewUser(req, res);
                break;
              default:
                res.status(Http.BadRequest.status).send(Http.BadRequest);
                break;
            }
          }
          , upload.single('image'));
        //--Login - Roles allowed: unknown guess
        app.post('/login', roleChecking(ROLE.NONE), emailClassifying(),
          (req: Request, res: Response) => {
            switch (req.body.role) {
              case ROLE.ADMIN:
                this.AdminController.logInAdmin(req, res);
                break;
              case ROLE.MERCHANT:
                this.MerchantController.logInMerchant(req, res);
                break;
              case ROLE.USER:
                this.UserController.logInUser(req, res);
                break;
              default:
                res.status(Http.BadRequest.status).send(Http.BadRequest);
                break;
            }
          });
        
        //ADMIN
        //--Login - Roles allowed: unknown guess
        // app.post('/admins/login', roleChecking(ROLE.NONE), this.AdminController.logInAdmin);


        //USER
        //--Create - Roles allowed: admin
        app.post('/users/create', roleChecking(ROLE.ADMIN_ALL), this.UserController.signUpNewUser);
        //--Read - Roles allowed: admin
        app.get('/users', roleChecking(ROLE.ADMIN_ALL), this.UserController.readAllUser);
        //--Read specific user - Roles allowed: user
        app.get('/users/:user_id', roleChecking(ROLE.USER_SELF), this.UserController.readUserById);

        // app.put('/users/:user_id', roleChecking(ROLE.ADMIN_ALL, ROLE.USER_SELF), this.UserController.readUserById);

        // app.delete('/users/:user_id', roleChecking(ROLE.ADMIN_ALL, ROLE.USER_SELF), this.UserController.readUserById);

        //MERCHANT
        //--Signup - Roles allowed: unknown guess
        // app.post('/merchants/signup', roleChecking(ROLE.NONE), this.MerchantController.signUpNewMerchant, upload.single('image'));
        //--Login - Roles allowed: unknown guess
        // app.post('/merchants/login', roleChecking(ROLE.NONE), this.MerchantController.logInMerchant);
        //--Create - Roles allowed: admin, merchant
        app.post('/merchants/create', 
          roleChecking(ROLE.ADMIN_ALL), 
          this.MerchantController.createNewMerchant, upload.single('image')
        );
         //--Read - Roles allowed: admin, merchant, user, none
        app.route('/merchants')
        .get(
          roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_ALL, ROLE.USER_ALL, ROLE.NONE), 
          this.MerchantController.readAllMerchant);
         //--Read - Roles allowed: admin, merchant, user, none
         app.route('/merchants/:merchant_id')
         .get(
           roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_ALL, ROLE.USER_ALL, ROLE.NONE), 
           this.MerchantController.readAllMerchantById);
        //--Update - Roles allowed: admin, merchant
        app.put('/merchants/:merchant_id', 
          roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), 
          this.MerchantController.updateOneMerchant, upload.single('image'))
        //--Delete - Roles allowed: admin, merchant
        app.route('/merchants/:merchant_id')
        .delete(
          roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), 
          this.MerchantController.deleteOneMerchant);  


        //CATEGORY
        //--Create - Roles allowed: admin
        app.post('/categories/create', roleChecking(ROLE.ADMIN_ALL), this.CategoryController.createNewCategory, upload.single('image'));
        //--Read - Roles allowed: admin, user, merchant, none
        app.route('/categories')
        .get(roleChecking(ROLE.NONE, ROLE.ADMIN_ALL, ROLE.USER_ALL, ROLE.MERCHANT_ALL), this.CategoryController.readAllCategory);
        //--Update - Roles allowed: admin
        app.put('/categories/:category_id', roleChecking(ROLE.ADMIN_ALL), this.CategoryController.updateOneCategory, upload.single('image'))
        //--Delete - Roles allowed: admin
        app.route('/categories/:category_id')
        .delete(roleChecking(ROLE.ADMIN_ALL), this.CategoryController.deleteOneCategory);


        //PRODUCT
        //--Create - Roles allowed: admin
        app.post('/products/create', roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductController.createNewProduct, upload.single('image'));
        //--Read - Roles allowed: admin, merchant, user, none
        app.route('/products')
        .get(roleChecking(ROLE.ADMIN_ALL, ROLE.USER_ALL, ROLE.NONE), this.ProductController.readAllProduct);
        //--Read by merchantid - Roles allowed: admin, merchant
        app.route('/products/:merchant_id')
        .get(roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF, ROLE.USER_ALL), this.ProductController.readAllProductByMerchantId);
        //--Update - Roles allowed: admin, merchant
        app.put('/products/:product_id', roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductController.updateOneProduct, upload.single('image'))
        //--Delete - Roles allowed: admin, merchant
        app.route('/products/:product_id')
        .delete(roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductController.deleteOneProduct);


        //PRODUCT GROUP
        //--Create - Roles allowed: admin, merchant
        app.post('/productgroups/create', roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductGroupController.createNewProductGroup);
        //--Read - Roles allowed: admin, user, none
        app.route('/productgroups')
        .get(roleChecking(ROLE.ADMIN_ALL, ROLE.USER_ALL, ROLE.NONE), this.ProductGroupController.readAllProductGroup);
        //--Read by merchantid - Roles allowed: admin, merchant
        app.route('/productgroups/:merchant_id')
        .get(roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF, ROLE.USER_ALL), this.ProductGroupController.readAllProductGroupByMerchantId);
        //--Update - Roles allowed: admin, merchant
        app.put('/productgroups/:productgroup_id', roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductGroupController.updateOneProductGroup)
        //--Delete - Roles allowed: admin, merchant
        app.route('/productgroups/:productgroup_id')
        .delete(roleChecking(ROLE.ADMIN_ALL, ROLE.MERCHANT_SELF), this.ProductGroupController.deleteOneProductGroup);

    }
}