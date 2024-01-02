import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronServer } from "./cron/cron-server";
import { EmailService } from "./email/email-service";


//instancias de las implementaciones, file systen datasource
// const logRepository = new LogRepositoryImpl(
//     // new FileSystemDatasource(),
//     // new MongoLogDatasource(),
//     new PostgresLogDatasource()
// );
//instacias de nuestros logs repositories multiples
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);



const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...');

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);


        //invocamos nuestra class cron server
        CronServer.createJob(
            //agremos el valor de mi tiempo  de ejecución
            '*/5 * * * * *',
            //agrego que tendra en mi función
            () => {
                const url = 'https://google.com'
                new CheckServiceMultiple(
                    [fsLogRepository,postgresLogRepository,mongoLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
        // //invocamos nuestra class cron server
        // CronServer.createJob(
        //     //agremos el valor de mi tiempo  de ejecución
        //     '*/5 * * * * *',
        //     //agrego que tendra en mi función
        //     ()=>{
        //         const url ='https://google.com'
        //         new CheckService(
        //             logRepository,
        //             ()=> console.log(`${url} is ok`),
        //             (error)=>console.log(error)
        //         ).execute(url);
        //     }
        // );        
    }
}