import TYPES from '../../constants/types';
import Logger from './logger';
import { inject, provideSingleton } from '../../ioc/iocUtils';

/* tslint:disable:no-console */
@provideSingleton(TYPES.Logger)
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
