import { ModuleMetadata } from '@nestjs/common';
import { ILogger, ILoggerOptions } from '../types';
import { MiddlewareConfigProxy } from '@nestjs/common/interfaces';

export type IParams = ILoggerOptions & {
  forRoutes?: Parameters<MiddlewareConfigProxy['forRoutes']>;
  exclude?: Parameters<MiddlewareConfigProxy['exclude']>;
};

export interface LoggerModuleAsyncParams
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => ILoggerOptions | Promise<ILoggerOptions>;
  inject?: any[];
}

export const PARAMS_PROVIDER_TOKEN = 'logsage';
export type PassedLogger = { logger: ILogger };
