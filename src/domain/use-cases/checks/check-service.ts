import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute( url:string ):Promise<boolean>;
}
//1.- la información que vamos a inyectar
type SuccessCallback = (() =>void) | undefined;
type ErrorCallback =((error:string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    //2.- INYECCION DE DEPENDENCIA #1 para ver si falla mi conexion o no
    constructor(
        private readonly logRepository:LogRepository,//<--
        private readonly successCallback :SuccessCallback,
        private readonly errorCallback :ErrorCallback
    ){}


    public async execute(url: string): Promise<boolean> {
        try {
            //conexion al servidor
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message:`Service ${url} working`,
                level:LogSeverityLevel.low,
                origin:'check-service.ts'});
            this.logRepository.saveLog(log);
            //3.- Si todo esta bien llamamos a nuestro successCallback
            this.successCallback && this.successCallback();
            console.log(`${url} is ok`);
            
            return true;
        } catch (error) {
            // console.log(`${error}`);
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message:errorMessage,
                level:LogSeverityLevel.high,
                origin:'check-service.ts',
            });
            this.logRepository.saveLog(log);
            
            //3.- Si hay errorres llamamo a nuestro errorCallback
            this.errorCallback && this.errorCallback(`${error}`);
            return false;
        }
    }

}