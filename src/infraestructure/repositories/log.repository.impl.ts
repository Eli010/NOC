import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository{

    //realizaremos una injección de dependencia
    constructor(
    //de forma corta || short cut
    private readonly logDataSource:LogDatasource, //<---- podemos cambiar por cualquier otro datasource
    ){}

    //implementamos las interfaces de los métodos 
    async saveLog(log: LogEntity): Promise<void> {
        //invocamos la injección
       return this.logDataSource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }

}