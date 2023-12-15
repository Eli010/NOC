import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

//me creo una interfaz para enviar los datos del email
interface SendMailOptions{
    to:string | string[];
    subject: string;
    htmlBody:string;
    attachements?:Attachment[];
}

//creamos nuestro attachment
interface Attachment{
    filename:string;
    path:string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth:{
            user:envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY,
        }
    });
    //1.inyectar repositorio
    constructor(
        private readonly logRepository:LogRepository,
    ){}

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const{to,subject,htmlBody,attachements =[]} = options;

        try {
            //enviamos a nuestro email
            const sendInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments:attachements,
            });
            // console.log(sendInformation);
            
            //2. Inyectar repositorio
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message:'Email Sent',
                origin:'email.service.ts'
            });
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {

            
            //2. Inyectar repositorio
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message:'Email not Sent',
                origin:'email.service.ts'
            });
            this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to:string |string[]){
        const subject = 'Logs del servidor';
        const htmlBody =`
                <h3> Logs de sistema - NOC </h3>
                <p>  wiwwwwww lorem imsim asdnadnasdwnsadnfasnkjckjfasdwqewq asdwjksj gohlaos  </p>
                <p> Ver Logs adjuntos </p>
            `;
        const attachements:Attachment[] = [
            {filename:'logs-all.log',path:'./log/logs-all.log'},
            {filename:'logs-high.log',path:'./log/logs-high.log'},
            {filename:'logs-medium.log',path:'./log/logs-medium.log'},
        ];
        return this.sendEmail({
            to, subject,attachements,htmlBody
        });
    }
}