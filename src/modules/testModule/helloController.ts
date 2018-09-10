import { inject, fluentProvide } from '../../ioc/ioc';
import Logger from '../../libraries/logger/logger';
import TYPES from '../../constants/types';

@fluentProvide('Music/HelloController').whenTargetNamed('testModule').done()
class HelloController {
    private logger: Logger;

    public constructor(@inject(TYPES.Logger) logger: Logger) {
        this.logger = logger;
    }

    public hello(name: string) {
        this.logger.log('Hello ' + name);
    }
}

export default HelloController;
