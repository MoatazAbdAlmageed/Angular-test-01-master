import express, { Application,Request,Response, NextFunction } from "express";
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as config from './config/config.json';
import { TodoResource } from "./resources/todoResource";

const exp: Application = express();

const bodyParser = require('body-parser');
exp.use(bodyParser.urlencoded({ extended: false }))
exp.use(bodyParser.json());
exp.use((req:Request,res:Response,next:NextFunction)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Methods","OPTIONS,POST,DELETE,PATCH,GET");
    console.log(req.method);
    // if('OPTIONS'===req.method){
    //     res.status(200);
    // }else{
    //     next();
    // }
    next();
})

new TodoResource(config.contextRoot,exp);

exp.listen(5000, () => {
    exp.use(`/${config.contextRoot}/swagger`,swaggerUI.serve, swaggerUI.setup(swaggerDocument));
});
