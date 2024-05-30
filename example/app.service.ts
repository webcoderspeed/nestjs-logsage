import { Injectable } from '@nestjs/common';
import { LoggerService } from '../src';

@Injectable()
export class AppService {
  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  getWorld() {
    this.loggerService.info('Hello from AppService!');

    return 'World!';
  }
}
