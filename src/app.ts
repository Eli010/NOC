import { Server } from "./presentation/server";


//función anonima auto-invocable
(async()=>{
     main();
})();

function main(){
    Server.start();
}

