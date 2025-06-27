import { DynamicModule, Module } from "@nestjs/common";
import { MINIO_OPTIONS_TOKEN } from "./minio.consts";
import { MinioAsyncOptions, MinioOptions } from "./minio.options";
import { MinioService } from "./minio.service";

@Module({})
export class MinioModule {
  static forRoot(options: MinioOptions): DynamicModule {
    return {
      module: MinioModule,
      global: options.global,
      providers: [
        {
          provide: MINIO_OPTIONS_TOKEN,
          useValue: options,
        },
        MinioService,
      ],
      exports: [MinioService],
    };
  }

  static forRootAsync(options: MinioAsyncOptions): DynamicModule {
    const providers = options.providers ?? [];

    if (options.useFactory) {
      providers.push({
        provide: MINIO_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      });
    }

    providers.push(MinioService);

    return {
      module: MinioModule,
      global: options.global,
      imports: options.imports,
      providers: providers,
      exports: [MinioService],
    };
  }
}
