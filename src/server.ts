import express, { json } from 'express';
import {categoriesRoutes} from './routes/categories.routes'

const app = express();

app.use(json())

app.use('/categories', categoriesRoutes)

app.post('/persons', (req, res) => {
    const { name } = req.body
    return res.status(201).json({ name })
})

app.listen('3333', () => {
    console.log('listening on 3333');
})