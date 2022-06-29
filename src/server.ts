import express, { json } from 'express';
import { routes } from './routes';
import {categoriesRoutes} from './routes/categories.routes'
import {specificationsRoutes} from './routes/specifications.routes'

const app = express();

app.use(json())

app.use(routes)

app.listen('3333', () => {
    console.log('listening on 3333');
})