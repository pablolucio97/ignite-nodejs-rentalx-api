import "reflect-metadata";
import 'dotenv/config';
import express, { json, NextFunction } from 'express';
import 'express-async-errors'
import swagger from 'swagger-ui-express'
import { routes } from './routes';


import swaggerJSON from '../../../swagger.json'
import createConnection from '../typeorm'
import '@shared/container'
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection()
const app = express();

app.use(json())

app.use('/api-docs', swagger.serve, swagger.setup(swaggerJSON));

//reads the file content every time access the /avatar endpoint
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))

app.use(routes)

app.use((
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: 500,
        message: `Internal server error: ${err.message}`
    })

})

export { app }