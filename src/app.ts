import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from './data/mongo';


//función anonima auto-invocable
(async()=>{
     main();
})();

async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    })

    //Crear una colección = tabla, documento = row
    // const newLog = await LogModel.create({
    //     message:'Test message desde mongo',
    //     origin:'App.ts',
    //     level:'low'
    // });
    // //guardamos los datos en nuestro db
    // await newLog.save();
    // console.log(newLog);
    
    //traer todos los datos
    const logs = await LogModel.find();
    console.log(logs);
    

    //Server.start();
    
}

