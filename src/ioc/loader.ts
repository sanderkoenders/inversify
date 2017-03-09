import * as fs from "fs";
import * as path from "path";

class Loader {
    public static load(baseDir: string) {
        Loader.readDir(baseDir);
    }

    private static readDir(dir) {
        fs.readdirSync(dir).forEach((entity) => {
            Loader.processEntity(path.join(dir, entity));
        });
    }

    private static processEntity(entity: string) {
        if(fs.statSync(entity).isDirectory()) {
            Loader.readDir(entity);
        }
        else
        {
            Loader.loadFile(entity);
        }
    }

    private static loadFile(filePath) {
        if(path.extname(filePath) == ".js") {
            require(filePath);
        }
    }
}

export default Loader;