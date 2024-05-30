import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService, logExecutionTime } from '../src';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  @logExecutionTime
  getHello() {
    this.loggerService.info('Hello from Controller!');
    return this.appService.getWorld();
  }
}
