import { CronJob } from "cron";

//realizamos los typados de mi argumentos || parametros
type CronTime = string | Date;
type OnTick = ()=>void;

export class CronServer{
    //agregamos al typado a mis parametros
    static createJob(cronTime:CronTime, onTick:OnTick):CronJob{
        const job = new CronJob(
            //invoco mis parametros
            cronTime,
            onTick
            // '*/2 * * * * *',
            // ()=>{
            //     const date = new Date();        
            //     console.log('2 econd', date);
            // },
        );
        job.start();
        return job;
    }
}