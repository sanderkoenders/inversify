import * as express from 'express';
import IocContext from './ioc/ioc';
import * as path from 'path';
import TYPES from './constants/types';
import HelloController from './modules/testModule/helloController';

class Main {
  private app: express.Application;
  private environment: Environment;
  private iocContext: IocContext;

  public constructor(environment: Environment) {
    this.app = express();
    this.environment = environment;
    this.iocContext = new IocContext(path.resolve(__dirname, '..'));
  }

  public async initialize() {
    // Dynamically load annotated classes inside the loadPaths context
    this.iocContext.componentScan(this.environment.loadPaths);

    // Bind dependencies that need manual defining
    const container = this.iocContext.getContainer();
    container.bind<Environment>(TYPES.Environment).toConstantValue(this.environment);
    container.bind(TYPES.Console).toConstantValue(global.console);
  }

  public onListening() {
    const container = this.iocContext.getContainer();

    const helloController = container.getNamed<HelloController>('Music/HelloController', 'awesomeModule');

    helloController.hello('Sander');
  }

  public get App(): express.Application {
    return this.app;
  }
}

export = Main;
