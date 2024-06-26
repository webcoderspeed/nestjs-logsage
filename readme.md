# nestjs-logsage

`nestjs-logsage` is an innovative logging solution designed specifically for Nest.js applications. This pioneering logger package facilitates distributed logging within the Nest.js ecosystem, built on top of both Winston and Pino. This unique combination offers unparalleled flexibility, allowing developers to seamlessly switch between Pino and Winston as the underlying logging mechanism, and customize logging behavior to suit their needs.

Inspired by Java's Mapped Diagnostic Context (MDC) pattern, `nestjs-logsage` revolutionizes distributed tracing in Nest.js applications. Similar to how the MDC pattern empowers Java developers with comprehensive logging capabilities, this logger package extends similar capabilities to the Nest.js environment, enabling efficient management of contextual information across asynchronous operations.

## Workflow

- **Application Code**: Emits log messages using the logger provided by the logging framework.
- **Logger**: Intercepts log messages generated by the application code, checks the MDC for any contextual information associated with the current thread, and includes it in the log message.
- **Mapped Diagnostic Context (MDC)**: A thread-local map provided by the logging framework that allows developers to store and retrieve contextual information specific to the current thread.

## Features

- Seamless integration with Nest.js applications
- Option to choose between Pino and Winston as the logging library
- Easy configuration management for fine-tuning logging behavior
- Supports various configuration options such as log levels, output formats, and log destinations
- Enhanced debugging capabilities for gaining insights into application behavior and performance
- Distributed logging for managing contextual information across asynchronous operations

## Trace ID Management

- **Trace ID Injection**: The LoggerMiddleware automatically manages trace IDs within incoming requests. If a trace ID (x-trace-id header, body, query params) is found, it is used throughout the request lifecycle. If not, a unique trace ID is generated and attached to the request, ensuring each request is associated with a trace ID for distributed tracing.

## Installation

Install the package via npm:

```bash
npm install nestjs-logsage
```


## Usage

Initialize the logger service. You have two `LoggerType` options: `PINO` and `WINSTON`.

```typescript
//app.module.ts

import { Module } from '@nestjs/common';

import { LoggerType, LoggerModule, } from 'nestjs-logsage';

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
                destination: 'app.log',
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

```

Now you can inject the loggerService in any of service of nestjs as shown below:

```typescript
// app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from 'nestjs-logsage';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello() {
    this.loggerService.info('Hello from Controller!');
    return this.appService.getWorld();
  }
}
```

Example output:

```bash
[31-05-2024 04:05:35 AM] INFO: [123]:{"method":"GET","url":"/?x-trace-id=123","headers":{"host":"localhost:3000","user-agent":"curl/8.4.0","accept":"*/*","x-trace-id":"123"},"query":{"x-trace-id":"123"},"body":{}} {"x-trace-id":"123"}
[31-05-2024 04:05:35 AM] INFO: [123]:Hello from Controller! {"x-trace-id":"123"}
[31-05-2024 04:05:35 AM] INFO: [123]:Hello from Controller! {"x-trace-id":"123"}
[31-05-2024 04:05:40 AM] INFO: [123]:[timer: 5012 ms]:Inside app route after 5s {"EXECUTION_LOG_START_TIME":1717131035412,"EXECUTION_LOG_CALLER":"timer"} {"x-trace-id":"123"}

# [time] [level]: [traceId]:[methodName: execution time in ms]: message
```

## Contributing

If you have suggestions for improvements, bug reports, or other contributions, please feel free to open an issue or create a pull request.

## License

This project is licensed under the `MIT` License.
