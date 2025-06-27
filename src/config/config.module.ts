import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { DatabaseConfig } from './database.config';
import { validate } from './env.variables';
import { ServerConfig } from './server.config';
import { MinioConfig } from '@app/config/minio.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
    }),
  ],
  providers: [ServerConfig, DatabaseConfig, MinioConfig],
  exports: [ServerConfig, DatabaseConfig, MinioConfig],
})
export class AppConfigModule { }
