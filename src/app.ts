import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/mainRoutes";
import { Connection, createConnection } from "typeorm";
import * as model from "./models/mainModel";
import * as dotenv from "dotenv";
// import multer = require("multer");
const multer = require('multer');
const upload = multer();
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
        this.app.use(bodyParser.json({limit: '50mb'}));
        // for parsing application/xwww-form-urlencoded
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: false
        }));
        // for parsing multipart/form-data
        this.app.use(upload.any());
        this.app.use(express.static('public'));
        //Handling CORS issue
        this.app.all('/*', this.setupCORS);
    }


    private async pgSetup() {  
       
        this.connection = await createConnection({
            type: "postgres",
            host: process.env.HOST,
            port: parseInt(process.env.PORT || "", 10),
            username: process.env.UNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                model.Admin, 
                model.Merchant, 
                model.Category,
                model.Product
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