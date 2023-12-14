import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

//me creo una interfaz para enviar los datos del email
interface SendMailOptions{
    to:string,
    subject: string,
    htmlBody:string,
    //todo: attachements
}

    //todo: attachements

export class EmailService{
    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth:{
            user:envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const{to,subject,htmlBody} = options;

        try {
            //enviamos a nuestro email
            const sendInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
            });
            console.log(sendInformation);
            
            return true;
        } catch (error) {
            return false;
        }
    }
}