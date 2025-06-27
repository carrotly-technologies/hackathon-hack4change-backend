import { Module, ValidationPipe } from "@nestjs/common";
import { ServerConfig } from "./config/server.config";
import { AppResolver } from "./app.resolver";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { BusinessErrorFilter } from "./common/errors/business-error.filter";
import { BusinessErrorCode } from "./common/errors/enums/business-error-code.enum";
import { ValidationError } from "./common/errors/business.error";
import { AppConfigModule } from "@app/config/config.module";
import { AppGqlModule } from "@app/common/modules/app-gql.module";
import { AppDbModule } from "@app/common/modules/app-db.module";
import { AppMongoModelsModule } from "@app/common/modules/app-mongo-models.module";
import { ExampleModule } from "@app/example-module/example.module";
import { AppMinioModule } from "@app/common/modules/app-minio.module";

const commonModules = [
  AppConfigModule,
  AppDbModule,
  AppMongoModelsModule,
  AppGqlModule,
  AppMinioModule,
];

@Module({
  imports: [...commonModules, ExampleModule],
  providers: [
    AppResolver,
    {
      provide: APP_FILTER,
      useFactory: () => new BusinessErrorFilter(),
    },
    {
      provide: APP_PIPE,
      useFactory: (serverConfig: ServerConfig) =>
        new ValidationPipe({
          disableErrorMessages: !serverConfig.isDebug(),
          transform: true,
          exceptionFactory: ([...details]) =>
            new ValidationError(
              "validation failed",
              BusinessErrorCode.VALIDATION_FAILED,
              details,
            ),
        }),
      inject: [ServerConfig],
    },
  ],
})
export class AppModule {}
