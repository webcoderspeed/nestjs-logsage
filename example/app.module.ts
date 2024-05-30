import { Module } from '@nestjs/common';

import { LoggerType, LoggerModule, } from '../src';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      type: LoggerType.PINO,
      options: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                destination: 'api.log',
                singleLine: true,
                colorize: false,
                levelFirst: false,
                translateTime: 'dd-mm-yyyy hh:mm:ss TT',
              },
            },
            {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
                levelFirst: false,
                translateTime: 'dd-mm-yyyy hh:mm:ss TT',
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
