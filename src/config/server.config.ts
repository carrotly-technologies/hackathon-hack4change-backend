import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Environment, EnvironmentVariables } from "./env.variables";

@Injectable()
export class ServerConfig {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  getPort(): number {
    return this.config.get<number>("PORT") ?? 3000;
  }

  getEnv(): Environment {
    return this.config.get<Environment>("ENV") ?? Environment.Dev;
  }

  getAppName(): string {
    return this.config.get<string>("APP_NAME") ?? "NMG API";
  }

  getCorsOrigin(): string {
    return this.config.get<string>("CORS_ORIGIN") ?? "*";
  }

  isDebug(): boolean {
    return !!this.config.get<boolean>("DEBUG");
  }

  getEnablePlayground(): boolean {
    return !!this.config.get<boolean>("ENABLE_PLAYGROUND");
  }

  getEnableIntrospection(): boolean {
    return !!this.config.get<boolean>("ENABLE_INTROSPECTION");
  }
}
