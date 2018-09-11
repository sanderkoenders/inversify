import TYPES from '../../constants/types';
import Logger from './logger';
import { inject, provideSingleton } from '../../ioc/iocUtils';
import 'reflect-metadata';

/* tslint:disable:no-console */
@provideSingleton(TYPES.Logger)
class LoggerImpl implements Logger {
  private appName: string;
  private consoleRef: any;

  public constructor(@inject(TYPES.Environment) environment: any, @inject(TYPES.Console) consoleRef: any) {
    this.consoleRef = consoleRef || console;
    this.appName = environment.appName;
  }

  public log(message: string) {
    this.consoleRef.log(this.appName + ' says: ' + message);
  }
}

export default LoggerImpl;
