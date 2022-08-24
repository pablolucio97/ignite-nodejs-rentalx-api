import { Connection } from 'typeorm'
import request from 'supertest'
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm'

let connection : Connection

describe('list categories', () => {


    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()

    })

    afterAll(async () => {
        await connection.close()
    })

    it('should be able to list all categories', async () => {

        const response = await request(app).get('/categories')

        expect(response.status).toBe(200)

    })

})