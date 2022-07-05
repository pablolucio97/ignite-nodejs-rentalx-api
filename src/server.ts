import express, { json } from 'express';
import swagger from 'swagger-ui-express'
import { routes } from './routes';

import swaggerJSON from '../src/swagger.json'

const app = express();

app.use(json())

app.use('/api-docs', swagger.serve, swagger.setup(swaggerJSON));

app.use(routes)

app.listen('3333', () => {
    console.log('listening on 3333');
})