import { ContainerModule } from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import { container } from './ioc';

class Loader {
    public static load(directories: string[]) {
        directories.forEach(Loader.readDir);

        container.load(Loader.getContainerModuleForDependencies());
    }

    private static readDir(dir: string) {
        fs.readdirSync(dir).forEach((entity) => {
            Loader.processEntity(path.join(dir, entity));
        });
    }

    private static processEntity(entity: string) {
        if (fs.statSync(entity).isDirectory()) {
            Loader.readDir(entity);
        } else {
            Loader.loadFile(entity);
        }
    }

    private static loadFile(filePath: string) {
        if (path.extname(filePath) === '.js') {
            require(filePath);
        }
    }

    private static getContainerModuleForDependencies() {
        return new ContainerModule((bind) => {
            const provideMetadata: any[] = Reflect.getMetadata('inversify-binding-decorators:provide', Reflect) || [];
            provideMetadata.map(metadata => metadata.constraint(bind, metadata.implementationType));
        });
    }
}

export default Loader;
