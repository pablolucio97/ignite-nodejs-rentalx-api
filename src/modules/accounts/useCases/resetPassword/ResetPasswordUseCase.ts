import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserRepositoryTokens";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUsecase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ token, password }: IRequest) : Promise<void> {

        //verifies if the token exists inside usersToken
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if (!userToken) {
            throw new AppError('Token invalid')
        }

        //compare if the token has expired returning true if is expired, compare if 
        //the second date is bigger than first
        if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError('Token expired')
        }

        //search for the user through the relationship between userToken and user
        const user = await this.usersRepository.findById(userToken.user_id)

        //alters the user password
        user.password = await hash(password, 8)

        //create a new user with the new password 
        await this.usersRepository.create(user)

        //removes the token already used by the user
        await this.usersTokensRepository.deleteById(userToken.id)
    }




}

export { ResetPasswordUsecase }