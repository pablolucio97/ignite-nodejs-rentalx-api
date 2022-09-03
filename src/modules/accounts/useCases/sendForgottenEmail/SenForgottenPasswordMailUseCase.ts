import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensReposiroty";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid'
import { resolve } from 'path'

@injectable()
class SenForgottenPasswordMailUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: UsersTokenRepository,
        @inject('DateProvider')
        private dateProvider: DateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider,
    ) { }

    async execute(email: string) {

        const user = await this.usersRepository.findByEmail(email)
        const token = uuidv4()
        const expires_date = this.dateProvider.addHours(3)

        //resolve the path until forgotPassword.hbs
        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'emails',
            'forgotPassword.hbs'
        )

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD_URL}${token}`
        }

        if (!user) {
            throw new AppError('User does not exists.')
        }


        await this.usersTokensRepository.create({
            expires_date,
            refresh_token: token,
            user_id: user.id
        })

        await this.mailProvider
            .sendMail(
                email,
                'Recuperação de senha',
                variables,
                templatePath
            )
    }
}

export { SenForgottenPasswordMailUseCase }