import { inject } from "tsyringe";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from "../../repositories/implementations/IUserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

class AuthenticateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch || !user) {
            throw new Error('Email or password incorrect')
        }

        const token = sign({}, '6ebbc2816367bcf0f8c10a5f5542b960', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { user, token }
    }
}

export { AuthenticateUserUseCase }