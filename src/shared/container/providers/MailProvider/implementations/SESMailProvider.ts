import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs'
import aws from 'aws-sdk'

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
      this.client = nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01',
            region: process.env.AWS_REGION
        })
      })
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

         await this.client.sendMail({
            to,
            from: 'Rentx <pablojmde@gmail.com>', //same from aws ses email
            subject,
            html: templateHTML
        })
    }
}

export { SESMailProvider }
