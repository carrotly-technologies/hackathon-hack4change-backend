import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';
import { Environment, EnvironmentVariables } from './config/env.variables';
import { ServerConfig } from './config/server.config';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { registerEnums } from './utils/registerEnums';

export async function createApp(enableLogger = true) {
  const config = new ConfigService<EnvironmentVariables>();
  const serverConfig = new ServerConfig(config);

  const app = await NestFactory.create(AppModule, {
    logger: enableLogger ? ['log', 'error', 'warn', 'debug', 'verbose'] : [],
  });

  app.use(
    helmet({
      contentSecurityPolicy:
        serverConfig.getEnv() === Environment.Production ? undefined : false,
      crossOriginEmbedderPolicy:
        serverConfig.getEnv() === Environment.Production ? undefined : false,
    }),
  );

  app.enableCors();

  // TODO: replace me with @nestjs/throttler
  // read docs: https://docs.nestjs.com/security/rate-limiting#graphql
  //            https://docs.nestjs.com/security/rate-limiting
  // app.use(rateLimit(serverConfig.getRateLimitConfig()));
  app.setGlobalPrefix('api');

  registerEnums();
  return app;
}

async function bootstrap(enableLogger = true) {
  const config = new ConfigService<EnvironmentVariables>();
  const serverConfig = new ServerConfig(config);
  const logger = new Logger('bootstrap');
  const app = await createApp(enableLogger);
  await app.listen(serverConfig.getPort(), '0.0.0.0');

  logger.log('Server started on port ' + serverConfig.getPort());
  logger.log('Current time: ' + new Date().toLocaleString());
  logger.log('App version: ' + process.env.npm_package_version);
  logger.log('Current url ' + (await app.getUrl()));
}

async function generateSchema() {
  const logger = new Logger('scripts');
  logger.log('Generating schema...');
  const app = await createApp(false);
  await app.init();
  process.exit(0);
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
process.argv.includes('generate-schema')
  ? void generateSchema()
  : void bootstrap();
