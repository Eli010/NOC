import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';


//función anonima auto-invocable
(async()=>{
     main();
})();

function main(){
    Server.start();
    // console.log(process.env.MAILER_EMAIL);
    // console.log(envs);
    
}

