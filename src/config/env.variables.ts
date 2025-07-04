import { plainToClass, Transform } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  validateSync,
} from "class-validator";

export enum Environment {
  Local = "local",
  Dev = "dev",
  Production = "production",
  Test = "test",
}

export class EnvironmentVariables {
  @IsString()
  APP_NAME = "NMG API";

  @IsString()
  API_VERSION = "1";

  @IsNotEmpty()
  CORS_ORIGIN = "*";

  @IsEnum(Environment)
  ENV: Environment = Environment.Local;

  @IsInt()
  @Transform(({ value }) => +value)
  PORT = 3000;

  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === 1 || value === "1")
  DEBUG = false;

  @IsString()
  @IsNotEmpty()
  DATABASE_URI!: string;

  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === 1 || value === "1")
  ENABLE_PLAYGROUND = true;

  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === 1 || value === "1")
  ENABLE_INTROSPECTION = true;

  @IsString()
  @IsNotEmpty()
  MINIO_REGION = "eu-central-1";

  @IsString()
  @IsNotEmpty()
  MINIO_ENDPOINT!: string;

  @IsInt()
  @Transform(({ value }) => +value)
  MINIO_PORT = 9000;

  @IsString()
  @IsNotEmpty()
  MINIO_ACCESS_KEY!: string;

  @IsString()
  @IsNotEmpty()
  MINIO_SECRET_KEY!: string;

  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === 1 || value === "1")
  MINIO_USE_SSL = false;

  @IsString()
  @IsNotEmpty()
  MINIO_PUBLIC_URL!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
