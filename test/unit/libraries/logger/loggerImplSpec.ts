import * as sinon from 'sinon';
import { assert } from 'chai';
import LoggerImpl from '../../../../src/libraries/logger/loggerImpl';

const fakeConsole = {
  log: sinon.stub()
};

describe('LoggerImpl', () => {
  const appName = 'InversifyJsExample';
  const sandbox = sinon.createSandbox();

  let subjectUnderTest: LoggerImpl;

  beforeEach(() => {
    subjectUnderTest = new LoggerImpl({ appName }, fakeConsole);
  });

  afterEach(() => sandbox.restore());

  it('should call "console.log" when log is called', () => {
    const message = 'test';

    subjectUnderTest.log(message);

    const consoleLogCalled = fakeConsole.log.calledWith(appName + ' says: ' + message);
    assert(consoleLogCalled, 'console.log should have been called');
  });
});
