import { v4 as uuidv4 } from 'uuid'
import { hash } from 'bcryptjs'
import createConnection from '../index'

async function create() {
    const connection = await createConnection('localhost')

    const id = uuidv4()
    const password = await hash('admin', 8)

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driver_license")
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', '123456')
        `
    )

    await connection.close
}

create().then(() => console.log('Admin user created'))


