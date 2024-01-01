import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
    //creo mis path/archivos
    private readonly logPath ='log/';
    private readonly allLogsPath ='log/logs-all.log';
    private readonly mediumLogsPath ='log/logs-medium.log';
    private readonly highLogsPath ='log/logs-high.log';

    constructor(){
        this.createLogFiles();
    }

    //para asegurar que esos archivos existan
    private createLogFiles = ()=>{
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path =>{
            if (fs.existsSync(path))return;
            fs.writeFileSync(path,''); 
        })

    }
    //con esto grabaremos en nuestro sistema de log
    async saveLog(newLog: LogEntity): Promise<void> {
        //extramos por repetición
        const logAsJson = `${JSON.stringify(newLog)} \n`

        // appendFileSync = nos ayuda a añadir una linea al final del archivo 
        fs.appendFileSync(this.allLogsPath,logAsJson );

        //si el nivel es log no hacemos nada
        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath,logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPath,logAsJson);
        }

    }

    //
    private getLogsFromFile = (path:string):LogEntity[] =>{
        const content = fs.readFileSync(path,'utf-8');
        if (content === '') return [];
        //separamos nuestras datos
        const logs = content.split('\n').map(LogEntity.fromJson);
        // const logs = content.split('\n').map(
        //     log=> LogEntity.fromJson(log)
        //     );
        return logs;    
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
        
            default:
                throw new Error(`${severityLevel} not implement`);
        }
    }

}