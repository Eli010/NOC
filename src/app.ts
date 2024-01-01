import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDataBase } from './data/mongo';


//función anonima auto-invocable
(async()=>{
     main();
})();

async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    })

    //Server.start();
    // console.log(process.env.MAILER_EMAIL);
    // console.log(envs);
    
}

