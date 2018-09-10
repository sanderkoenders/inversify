import 'reflect-metadata';
import { Container, inject } from 'inversify';
import { autoProvide, provide, fluentProvide } from 'inversify-binding-decorators';

const container = new Container();

export { container, autoProvide, provide, inject, fluentProvide };
