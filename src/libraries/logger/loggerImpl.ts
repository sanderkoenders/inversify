import Logger from "./logger";
import {provide} from "../../ioc/ioc";

@provide("Logger")
class LoggerImpl implements Logger {
    public log(message: string) {
        console.log(message);
    }
}

export default LoggerImpl;