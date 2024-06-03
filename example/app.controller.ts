import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  async getHello() {
    this.logger.debug('Hello from Controller!', { password: Math.random() });
    return this.appService.getWorld();
  }
}
