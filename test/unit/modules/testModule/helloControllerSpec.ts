import 'reflect-metadata';
import * as sinon from 'sinon';
import HelloController from '../../../../src/modules/testModule/helloController';
import LoggerImpl from '../../../../src/libraries/logger/loggerImpl';
import Logger from '../../../../src/libraries/logger/logger';
import { assert } from 'chai';

describe('TestModule HelloController', () => {
  const sandbox = sinon.createSandbox();

  let loggerStub: sinon.SinonStubbedInstance<Logger>;

  let subjectUnderTest: HelloController;

  beforeEach(() => {
    loggerStub = sandbox.createStubInstance(LoggerImpl);

    subjectUnderTest = new HelloController(loggerStub);
  });

  afterEach(() => sandbox.restore());

  it('should prefix the message with "Hello" when calling hello', () => {
    const name = 'tester';

    subjectUnderTest.hello(name);

    assert(loggerStub.log.calledWith(`Hello ${name}`));
  });
});
