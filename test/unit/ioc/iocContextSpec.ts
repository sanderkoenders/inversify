import * as sinon from 'sinon';
import * as fs from 'fs';
import * as path from 'path';
import IocContext from '../../../src/ioc/ioc';
import { assert, expect } from 'chai';
import { ContainerModule } from 'inversify';

const loader: any = {
  loader: () => { /* fake implementation */ }
};

const container: any = {
  load: () => { /* fake implementation */ }
};

const reflect: any = {
  getMetadata: () => { /* fake implementation */ }
};

describe('IocContext', () => {
  const DONT_CARE: any = {};

  const sandbox = sinon.createSandbox();
  const projectRoot = '/path/to/project';
  const contextPath = 'services';
  const awesomeModulePath = path.join(projectRoot, contextPath, 'awesomeModule');
  const modulePath = path.join(projectRoot, contextPath, 'module');

  let readdirSyncStub: sinon.SinonStub;
  let statSyncStub: sinon.SinonStub;
  let loaderStub: sinon.SinonStub;
  let getMetadataStub: sinon.SinonStub;
  let containerLoadStub: sinon.SinonStub;
  let bindStub: sinon.SinonStub;
  let constraintStub: sinon.SinonStub;

  let subjectUnderTest: IocContext;

  beforeEach(() => {
    readdirSyncStub = sandbox.stub(fs, 'readdirSync');
    readdirSyncStub.withArgs(path.join(projectRoot, contextPath)).returns(['awesomeModule', 'module']);
    readdirSyncStub.withArgs(awesomeModulePath).returns(['awesomeFile.js', 'anotherAwesomeFile.js', 'notAJsFile.txt']);
    readdirSyncStub.withArgs(modulePath).returns(['file.js', 'anotherFile.ts']);

    statSyncStub = sandbox.stub(fs, 'statSync');
    statSyncStub.withArgs(path.join(projectRoot, contextPath, 'module')).returns({ isDirectory: () => true });
    statSyncStub.withArgs(path.join(projectRoot, contextPath, 'awesomeModule')).returns({ isDirectory: () => true });
    statSyncStub.returns({ isDirectory: () => false });

    constraintStub = sandbox.stub();
    constraintStub.callsArg(0);

    getMetadataStub = sandbox.stub(reflect, 'getMetadata');
    getMetadataStub.returns([{ constraint: constraintStub, implementationType: 'test' }]);

    bindStub = sandbox.stub();
    containerLoadStub = sandbox.stub(container, 'load');
    containerLoadStub.callsFake((containerModule: ContainerModule) => {
      containerModule.registry(bindStub, DONT_CARE, DONT_CARE, DONT_CARE);
    });

    loaderStub = sandbox.stub(loader, 'loader');

    subjectUnderTest = new IocContext(projectRoot, loader.loader, container, reflect);
  });

  afterEach(() => sandbox.restore());

  it('should return the container when getContainer is called', () => {
    expect(subjectUnderTest.getContainer()).equals(container);
  });

  it('should call readdirSync with "services" as parameter on first call', () => {
    subjectUnderTest.componentScan([contextPath]);

    assert(readdirSyncStub.calledWith(path.join(projectRoot, contextPath)));
  });

  it('should call readdirSync thrice when componentScan is invoked', () => {
    subjectUnderTest.componentScan([contextPath]);

    assert(readdirSyncStub.calledThrice);
  });

  it('should load the files with a js extension when componentScan is called', () => {
    subjectUnderTest.componentScan([contextPath]);

    assert(loaderStub.calledWith(path.join(awesomeModulePath, 'awesomeFile.js')));
    assert(loaderStub.calledWith(path.join(awesomeModulePath, 'anotherAwesomeFile.js')));
    assert(loaderStub.calledWith(path.join(modulePath, 'file.js')));

    assert(loaderStub.neverCalledWith(path.join(awesomeModulePath, 'notAJsFile.txt')));
    assert(loaderStub.neverCalledWith(path.join(modulePath, 'anotherFile.ts')));
  });

  it('should call "getMetadata" method on "Reflect" with the correct annotation identifier', () => {
    subjectUnderTest.componentScan([contextPath]);

    assert(getMetadataStub.calledWith('inversify-binding-decorators:provide'));
  });

  it('should call the constraint method on the returned reflect metadata', () => {
    subjectUnderTest.componentScan([contextPath]);

    assert(constraintStub.calledWith(bindStub, 'test'));
  });

  it('should be able to handle scenario\'s where getMetadata returns undefined', () => {
    getMetadataStub.returns(undefined);

    subjectUnderTest.componentScan([contextPath]);

    assert(bindStub.notCalled);
  });
});
