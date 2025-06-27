import {
  DynamicModule,
  ForwardReference,
  InjectionToken,
  OptionalFactoryDependency,
  Provider,
  Type,
} from "@nestjs/common";

export interface MinioOptions {
  global?: boolean;
  region: string;
  endpoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  publicUrl?: string;
}

export interface MinioAsyncOptions {
  global?: boolean;
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference
  )[];
  useFactory?: (
    ...args: any[]
  ) => Promise<Omit<MinioOptions, "global">> | Omit<MinioOptions, "global">;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
  providers?: Provider[];
}
