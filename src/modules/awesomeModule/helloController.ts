import { fluentProvide, inject } from '../../ioc/iocUtils';
import Logger from '../../libraries/logger/logger';
import TYPES from '../../constants/types';

@fluentProvide('Music/HelloController').whenTargetNamed('awesomeModule').done()
class HelloController {
  @inject(TYPES.Logger) private logger: Logger;

  public hello(name: string) {
    this.logger.log('Awesome hello ' + name);
  }
}

export default HelloController;
