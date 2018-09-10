import * as express from 'express';
import Ioc from './ioc/ioc';
import * as path from 'path';
import TYPES from './constants/types';
import HelloController from './modules/testModule/helloController';

class Main {
  private app: express.Application;
  private environment: Environment;
  private container: Ioc;

  public constructor(environment: Environment) {
    this.app = express();
    this.environment = environment;
    this.container = new Ioc(path.resolve(__dirname, '..'));
  }

  public async initialize() {
    // Dynamically load annotated classes inside the loadPaths context
    this.container.componentScan(this.environment.loadPaths);

    // Bind dependencies that need manual defining
    this.container.bind<Environment>(TYPES.Environment).toConstantValue(this.environment);
  }

  public onListening() {
    const helloController = this.container.getNamed<HelloController>('Music/HelloController', 'awesomeModule');

    helloController.hello('Sander');
  }

  public get App(): express.Application {
    return this.app;
  }
}

export = Main;
