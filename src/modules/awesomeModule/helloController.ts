import { inject, provide } from "../../ioc/ioc";
import Logger from "../../libraries/logger/logger";
import TYPES from "../../constants/types";

@provide("Music/HelloController").whenTargetNamed("awesomeModule").done()
class HelloController {
    @inject(TYPES.Logger) private _logger: Logger;

    public hello(name: string) {
        this._logger.log("Awesome hello " + name);
    }
}

export default HelloController;