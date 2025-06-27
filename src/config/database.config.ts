import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ServerConfig } from './server.config';
import { EnvironmentVariables } from './env.variables';

@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory {
  serverConfig: any;
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {
    this.serverConfig = new ServerConfig(config);
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get('DATABASE_URI'),
      retryDelay: 1000,
      retryAttempts: 1,
    };
  }
}
