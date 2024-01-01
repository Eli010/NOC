import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource{
    //creamos nuestros datos o log
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        //para asegurar
        // await newLog.save();
        console.log('Mongo Log Created: ', newLog.id);
        
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level:severityLevel
        });
        //ambos codigos son iguales
        // return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
        return logs.map( LogEntity.fromObject);
    }
}