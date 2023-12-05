import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
    //creo mis path/archivos
    private readonly logPath ='log/';
    private readonly allLogsPath ='log/logs-low.log';
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

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity> {
        throw new Error("Method not implemented.");
    }

}