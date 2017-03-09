import "reflect-metadata";
import { Container, inject } from 'inversify';
import { autoProvide, makeFluentProvideDecorator } from 'inversify-binding-decorators';

let container = new Container();

let provide = makeFluentProvideDecorator(container);

export { container, autoProvide, provide, inject };