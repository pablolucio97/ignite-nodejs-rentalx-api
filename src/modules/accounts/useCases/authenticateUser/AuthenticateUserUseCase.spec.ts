/* import { AppError } from "@shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory-tests/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase


describe('Authenticate user', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    })

    it('should be able to create a token', async () => {

        const fakeUser = {
            name: 'Jhon',
            username: 'jhon',
            email: 'jhon@gmail.com',
            password: '12345',
            driver_license: '12345'
        }

        await createUserUseCase.execute(fakeUser)

        const result = await authenticateUserUseCase.execute({
            email: fakeUser.email,
            password: fakeUser.password
        })

        expect(result).toHaveProperty('token')
    })

    it('should not be able to authenticate a none existent user ', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'some@gmail.com',
                password: '123',
            }),
        ).rejects.toEqual(new AppError('User does not exists'));
    });

    it('should not be able to authenticate a with wrong password', () => {
        expect(async () => {
            const fakeUser = {
                name: 'Jhon',
                username: 'jhon',
                email: 'jhon@gmail.com',
                password: '12345',
                driver_license: '12345'
            }

            await createUserUseCase.execute(fakeUser)

            await authenticateUserUseCase
                .execute({ email: fakeUser.email, password: 'incorrect' })


        }).rejects.toBeInstanceOf(TypeError)
    })
}) */