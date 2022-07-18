import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import { Connection, createConnection } from "typeorm";
import {Admin} from "./models/crmModel";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../db.env' });

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb'; 
    public connection: Connection;

    constructor(){
        this.app =  express();
        this.config();
        this.routePrv.routes(this.app); 

        this.pgSetup(); 
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }


    private async pgSetup() {  
       
        this.connection = await createConnection({
            type: "postgres",
            host: process.env.HOST,
            port: parseInt(process.env.PORT || "", 10),
            username: process.env.UNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Admin]
          });
    }

}

export default new App().app;