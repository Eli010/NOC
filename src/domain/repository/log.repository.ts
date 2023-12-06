import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//tenemos los dos funciones iguales, que nuestro datasource
//por que nuestro repository terminara llamando a nuestro datasource
export abstract class LogRepository{
    abstract saveLog (log:LogEntity):Promise<void>;
    abstract getLogs(severityLevel:LogSeverityLevel):Promise<LogEntity[]>;
}