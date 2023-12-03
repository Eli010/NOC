interface CheckServiceUseCase{
    execute( url:string ):Promise<boolean>;
}
//1.- la información que vamos a inyectar
type SuccessCallback = () =>void;
type ErrorCallback =(error:string) => void;

export class CheckService implements CheckServiceUseCase {

    //2.- INYECCION DE DEPENDENCIA #1 para ver si falla mi conexion o no
    constructor(
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

            //3.- Si todo esta bien llamamos a nuestro successCallback
            this.successCallback();
            console.log(`${url} is ok`);
            
            return true;
        } catch (error) {
            console.log(`${error}`);
            //3.- Si hay errorres llamamo a nuestro errorCallback
            this.errorCallback(`${error}`);
            return false;
        }
    }

}