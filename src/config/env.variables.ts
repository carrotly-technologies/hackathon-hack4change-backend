import { plainToClass, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Local = 'local',
  Dev = 'dev',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsString()
  APP_NAME = 'NMG API';

  @IsString()
  API_VERSION = '1';

  @IsNotEmpty()
  CORS_ORIGIN = '*';

  @IsEnum(Environment)
  ENV: Environment = Environment.Local;

  @IsInt()
  @Transform(({ value }) => +value)
  PORT = 3000;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  DEBUG = false;

  @IsString()
  @IsNotEmpty()
  DATABASE_URI!: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  ENABLE_PLAYGROUND = true;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === 1 || value === '1')
  ENABLE_INTROSPECTION = true;
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
