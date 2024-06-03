import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  private readonly logger = new Logger(AppService.name);

  async getWorld() {
    const time = new Date().getTime();

    await new Promise((res) => setTimeout(res, 6000));
    this.logger.error('Hello from AppService!', {
      EXECUTION_LOG_CALLER: 'APP_SERVICE',
      EXECUTION_LOG_START_TIME: time,
    });

    return 'World!';
  }
}
