import { Container, ContainerModule, interfaces } from 'inversify';
import * as path from 'path';
import * as fs from 'fs';
import 'reflect-metadata';

export default class Ioc {
  private static METADATA_PROVIDE_KEY = 'inversify-binding-decorators:provide';
  private static ALLOWED_EXTENSIONS = ['.js'];

  public constructor(
    private projectRoot: string,
    private loader: NodeRequire = require,
    private container: Container = new Container()
  ) { }

  public componentScan(contextPaths: string[]) {
    contextPaths.forEach(contextPath => this.readDir(path.join(this.projectRoot, contextPath)));

    this.container.load(this.getAnnotatedDependencies());
  }

  public bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>) {
    return this.container.bind<T>(serviceIdentifier);
  }

  public get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>) {
    return this.container.get<T>(serviceIdentifier);
  }

  public getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol) {
    return this.container.getNamed<T>(serviceIdentifier, named);
  }

  private readDir(dir: string) {
    fs.readdirSync(dir).forEach((entity) => {
      this.processEntity(path.join(dir, entity));
    });
  }

  private processEntity(entity: string) {
    if (fs.statSync(entity).isDirectory()) {
      this.readDir(entity);
    } else {
      this.loadFile(entity);
    }
  }

  private loadFile(filePath: string) {
    if (Ioc.ALLOWED_EXTENSIONS.indexOf(path.extname(filePath)) !== -1) {
      this.loader(filePath);
    }
  }

  private getAnnotatedDependencies() {
    return new ContainerModule(bind => {
      const provideMetadata: any[] = Reflect.getMetadata(Ioc.METADATA_PROVIDE_KEY, Reflect) || [];
      provideMetadata.map(metadata => metadata.constraint(bind, metadata.implementationType));
    });
  }
}
