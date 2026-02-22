/** biome-ignore-all lint/complexity/noStaticOnlyClass: Nestjs Syntax */
import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
  RequestMethod,
} from '@nestjs/common';
import {type Auth} from 'better-auth';
import {toNodeHandler} from 'better-auth/node';
import express from 'express';

export interface AuthOptions {
  auth: Auth;
}

export interface AuthModuleAsyncOptions {
  imports?: any[];
  inject?: any[];
  useFactory: (...args: any[]) => Promise<AuthOptions> | AuthOptions;
}

@Global()
@Module({})
export class AuthModule implements NestModule {
  private readonly logger = new Logger(AuthModule.name);

  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: 'AUTH_OPTIONS_TOKEN',
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: AuthModule,
      imports: options.imports || [],
      providers: [optionsProvider],
      exports: [optionsProvider],
      controllers: [],
    };
  }

  constructor(@Inject('AUTH_OPTIONS_TOKEN') private options: AuthOptions) {}

  async configure(consumer: MiddlewareConsumer) {
    const basePath = this.options.auth.options.basePath || '/auth';

    consumer
      .apply((req, res, next) => {
        if (req.url.startsWith(basePath)) {
          next();
        } else {
          express.json()(req, res, err => {
            if (err) {
              next(err);
              return;
            }
            express.urlencoded({extended: true})(req, res, next);
          });
        }
      })
      .forRoutes({
        path: '/*path',
        method: RequestMethod.ALL,
      });

    consumer.apply(toNodeHandler(this.options.auth)).forRoutes({
      path: `${basePath}/*path`,
      method: RequestMethod.ALL,
    });

    this.logger.log('AuthModule initialized with BetterAuth');
  }
}
