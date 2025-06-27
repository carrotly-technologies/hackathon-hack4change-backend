import { MinioConfig } from "@app/config/minio.config";
import { MinioModule } from "@app/minio/minio.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MinioModule.forRootAsync({
      global: true,
      inject: [MinioConfig],
      useFactory: (minioConfig: MinioConfig) => ({
        endpoint: minioConfig.getMinioEndpoint(),
        port: minioConfig.getMinioPort(),
        accessKey: minioConfig.getMinioAccessKey(),
        secretKey: minioConfig.getMinioSecretKey(),
        useSSL: minioConfig.isMinioUseSSL(),
        publicUrl: minioConfig.getMinioPublicUrl(),
      }),
    }),
  ],
})
export class AppMinioModule { }
