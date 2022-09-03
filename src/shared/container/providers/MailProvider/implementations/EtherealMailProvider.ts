import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs'

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            this.client = transporter
        }).catch(err => console.log(err))
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        templatePath: string
    ): Promise<void> {

        //reads the temaplteEmail content and convert to string
        const templateFileContent = fs.readFileSync(templatePath, 'utf8') 
        //compiles the converted string from templateEmail
        const templateParse = handlebars.compile(templateFileContent)
        //pass the variables from argument into the handlebars template
        const templateHTML  = templateParse(variables)

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreply@rentx.com.br>',
            subject,
            html: templateHTML
        })

        console.log('Message sent: %s', message.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

    }
}

export { EtherealMailProvider }
