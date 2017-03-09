import * as express from "express";
import Loader from "./ioc/loader";
import * as path from "path";
import { container } from "./ioc/ioc";

class Main {
    private _environment: any;
    private _app: express.Application;

    public constructor(environment: any) {
        this._environment = environment;
        this._app = express();

        this.loadJsFiles();
    }

    public onListening() {
        console.log("Server listening on port: " + this._environment.port);

        let helloController:any = container.get("HelloController");

        helloController.hello("Sander");
    }

    private loadJsFiles() {
        this._environment.loadPaths.forEach((dir) => {
            Loader.load(path.join(__dirname, dir));
        });
    }

    public get App(): express.Application {
        return this._app;
    }
}

export = Main;