import * as express from 'express';
import Loader from './ioc/loader';
import * as path from 'path';
import { container } from './ioc/ioc';
import TYPES from './constants/types';

class Main {
    private app: express.Application;

    public constructor(environment: any) {
        this.app = express();

        this.initializeDependencyInjector(environment);
    }

    public onListening() {
        const helloController: any = container.getNamed('Music/HelloController', 'testModule');

        helloController.hello('Sander');
    }

    private initializeDependencyInjector(environment: any) {
        container.bind<Environment>(TYPES.Environment).toConstantValue(environment);

        this.loadJsFiles(environment.loadPaths);
    }

    private loadJsFiles(loadPaths: string[]) {
        loadPaths.forEach((dir) => {
            Loader.load(path.join(__dirname, dir));
        });
    }

    public get App(): express.Application {
        return this.app;
    }
}

export = Main;
