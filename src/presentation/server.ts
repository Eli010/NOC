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
                const date = new Date();
                console.log('5 second ', date);
                
            }
        );        
    }
}