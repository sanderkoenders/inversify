import { inject, provide } from "../../ioc/ioc";
import Logger from "../../libraries/logger/logger";
import LoggerImpl from "../../libraries/logger/loggerImpl";

@provide("HelloController")
class HelloController {
    private _logger: Logger;

    public constructor(@inject(LoggerImpl) logger: Logger) {
        this._logger = logger;
    }

    public hello(name: string) {
        this._logger.log("Hello " + name);
    }
}

export default HelloController;