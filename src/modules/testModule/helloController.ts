import { inject, provide } from "../../ioc/ioc";
import Logger from "../../libraries/logger/logger";

@provide("HelloController")
class HelloController {
    private _logger: Logger;

    public constructor(@inject("Logger") logger: Logger) {
        this._logger = logger;
    }

    public hello(name: string) {
        this._logger.log("Hello " + name);
    }
}

export default HelloController;