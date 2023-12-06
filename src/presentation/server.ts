import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronServer } from "./cron/cron-server";


//instancias de las implementaciones, file systen datasource
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new mongoLogDS()
    // new OracleLogDs()
);


export class Server{
    public static start(){
        console.log('Server started...');
        //invocamos nuestra class cron server
        CronServer.createJob(
            //agremos el valor de mi tiempo  de ejecución
            '*/5 * * * * *',
            //agrego que tendra en mi función
            ()=>{
                // const date = new Date();
                // console.log('5 second ', date);
                // const url ='http://localhost:3000'
                const url ='https://google.com'
                new CheckService(
                    fileSystemLogRepository,
                    //4.-realizamos la llamada de nuestra inyeccion
                    ()=> console.log('success'),
                    (error)=>console.log(error)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );        
    }
}