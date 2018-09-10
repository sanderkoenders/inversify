import TYPES from '../../constants/types';
import Logger from './logger';
import { provide, inject } from '../../ioc/ioc';

/* tslint:disable:no-console */
@provide(TYPES.Logger)
class LoggerImpl implements Logger {
    private appName: string;

    public constructor(@inject(TYPES.Environment) environment: any) {
        this.appName = environment.appName;
    }

    public log(message: string) {
        console.log(this.appName + ' says: ' + message);
    }
}

export default LoggerImpl;
