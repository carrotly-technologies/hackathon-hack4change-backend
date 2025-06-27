import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "./env.variables";

@Injectable()
export class MinioConfig {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getMinioEndpoint(): string {
    return this.config.get<string>("MINIO_ENDPOINT") ?? "localhost";
  }

  getMinioPort(): number {
    return this.config.get<number>("MINIO_PORT") ?? 9000;
  }

  getMinioAccessKey(): string {
    return this.config.get<string>("MINIO_ACCESS_KEY")!;
  }

  getMinioSecretKey(): string {
    return this.config.get<string>("MINIO_SECRET_KEY")!;
  }

  isMinioUseSSL(): boolean {
    return this.config.get<boolean>("MINIO_USE_SSL") ?? false;
  }

  getMinioPublicUrl(): string {
    return (
      this.config.get<string>("MINIO_PUBLIC_URL") ?? "http://localhost:9000"
    );
  }
}
