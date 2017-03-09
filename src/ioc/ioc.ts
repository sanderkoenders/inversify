import "reflect-metadata";
import { Container, inject } from 'inversify';
import { autoProvide, makeProvideDecorator } from 'inversify-binding-decorators';

let container = new Container();

let provide = makeProvideDecorator(container);

export { container, autoProvide, provide, inject };