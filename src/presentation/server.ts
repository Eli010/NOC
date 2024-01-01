import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronServer } from "./cron/cron-server";
import { EmailService } from "./email/email-service";


//instancias de las implementaciones, file systen datasource
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new mongoLogDS()
    // new OracleLogDs()
);
const emailService = new EmailService();

export class Server{
    public static start(){
        console.log('Server started...');
        

        //todo:activar para enviar
        //mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     ['eli.tp.system@gmail.com','leetopa001@gmail.com']
        // )

        // const emailService = new EmailService(
        //     // fileSystemLogRepository
        // );
        // emailService.sendEmailWithFileSystemLogs(
        //     ['eli.tp.system@gmail.com','leetopa001@gmail.com']
        // );


        // emailService.sendEmail({
        //     to:'leetopa001@gmail.com',
        //     subject:'Logs de sistema',
        //     htmlBody:`
        //         <h3> Logs de sistema - NOC </h3>
        //         <p> lorem imsim asdnadnasdwnsadnfasnkjckjfasdwqewq asdwjksj gohlaos  </p>
        //         <p> Ver Logs adjuntos </p>
        //     `
        // })

        // console.log(envs.MAILER_EMAIL,envs.MAILER_SECRET_KEY);

        //invocamos nuestra class cron server
        // CronServer.createJob(
        //     //agremos el valor de mi tiempo  de ejecución
        //     '*/5 * * * * *',
        //     //agrego que tendra en mi función
        //     ()=>{
        //         // const date = new Date();
        //         // console.log('5 second ', date);
        //         // const url ='http://localhost:3000'
        //         const url ='https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             //4.-realizamos la llamada de nuestra inyeccion
        //             ()=> console.log('success'),
        //             (error)=>console.log(error)
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     }
        // );        
    }
}