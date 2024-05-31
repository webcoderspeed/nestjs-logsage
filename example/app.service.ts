import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) {}
  private readonly logger = new Logger(AppService.name);


  getWorld() {
    this.logger.error('Hello from AppService!');

    return 'World!';
  }
}
