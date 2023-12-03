import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronServer } from "./cron/cron-server";

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
                new CheckService(
                    //4.-realizamos la llamada de nuestra inyeccion
                    ()=> console.log('success'),
                    (error)=>console.log(error)
                ).execute('https://google.com');
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );        
    }
}