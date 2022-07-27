import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/main.routes";
import { Connection, createConnection } from "typeorm";
import * as model from "./models/main.model";
import * as dotenv from "dotenv";
import { validateToken } from "./middlewares/jwtAuth.middleware";
// import multer = require("multer");
const multer = require('multer');
const upload = multer();
const POSTGRES = "postgres";
const LIMITSIZE = "50mb";
dotenv.config({ path: __dirname+'/../.env.database' });

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes(); 
    public connection: Connection;

    constructor(){
        this.app =  express();
        this.config();
        this.routePrv.routes(this.app); 

        this.pgSetup(); 
    }
    
    private config(): void{
        // for parsing application/json
        this.app.use(bodyParser.json({limit: LIMITSIZE}));
        // for parsing application/xwww-form-urlencoded
        this.app.use(bodyParser.urlencoded({
            limit: LIMITSIZE,
            extended: false
        }));
        // for parsing multipart/form-data
        this.app.use(upload.any());
        this.app.use(express.static('public'));
        //Handling CORS issue
        this.app.all('/*', this.setupCORS);
        this.app.all('/*', validateToken);
    }


    private async pgSetup() {  
       
        this.connection = await createConnection({
            type: POSTGRES,
            host: process.env.HOST,
            port: parseInt(process.env.PORT || "", 10),
            username: process.env.UNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                model.Admin,
                model.User,
                model.Merchant, 
                model.Category,
                model.Product,
                model.ProductGroup
            ]
          });
    }

    private setupCORS(req, res, next) {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
        res.header('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    }

}

export default new App().app;