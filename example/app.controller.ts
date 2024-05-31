import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello() {
    this.logger.log('Hello from Controller!', { password: Math.random() });
    this.logger.warn('Hello from Controller!', { password: Math.random() });
    this.logger.error('Hello from Controller!', { password: Math.random() });
    this.logger.debug('Hello from Controller!', { password: Math.random() });
    return this.appService.getWorld();
  }
}
