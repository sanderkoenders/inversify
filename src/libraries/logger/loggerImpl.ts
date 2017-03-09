import Logger from "./logger";
import { provide, inject } from "../../ioc/ioc";

@provide(LoggerImpl)
class LoggerImpl implements Logger {
    private _appName: string;

    public constructor(@inject("Environment") environment: any)
    {
        this._appName = environment.appName;
    }

    public log(message: string) {
        console.log(this._appName + " says: " + message);
    }
}

export default LoggerImpl;