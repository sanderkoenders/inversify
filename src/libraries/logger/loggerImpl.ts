import TYPES from "../../constants/types";
import Logger from "./logger";
import { provide, inject } from "../../ioc/ioc";

@provide(TYPES.Logger).done()
class LoggerImpl implements Logger {
    private _appName: string;

    public constructor(@inject(TYPES.Environment) environment: any)
    {
        this._appName = environment.appName;
    }

    public log(message: string) {
        console.log(this._appName + " says: " + message);
    }
}

export default LoggerImpl;