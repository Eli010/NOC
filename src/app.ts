import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from './data/mongo';
import { PrismaClient } from '@prisma/client';


//función anonima auto-invocable
(async()=>{
     main();
})();

async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    })

    //POSTGRESSS!!!
    //postgres with prisma create
    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message:'Test message',
    //         origin:'App.ts'
    //     }
    // });
    // console.log(newLog);
    
    //traer datos con prisma
    const logs = await prisma.logModel.findMany({
        where:{
            level:'MEDIUM'
        }
    }
    );

    console.log(logs);
    


    // Server.start();
    
}

