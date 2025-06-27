import { Readable } from "node:stream";

export interface ExistsArgs {
  bucketName: string;
  objectName: string;
}

export interface GetArgs {
  bucketName: string;
  objectName: string;
}

export interface ListArgs {
  bucketName: string;
  prefix?: string;
  recursive?: boolean;
  listOpts?: {
    Delimiter?: string;
    MaxKeys?: number;
    IncludeVersion?: boolean;
  };
}

export interface UploadArgs {
  bucketName: string;
  objectName: string;
  data: Readable | Buffer | string;
  size?: number;
  metadata?: Record<string, any>;
}

export interface DeleteArgs {
  bucketName: string;
  objectName: string;
}

export interface SignArgs {
  method?: "GET" | "PUT";
  bucketName: string;
  objectName: string;
  expiresAfterSeconds?: number;
}

export interface UrlArgs {
  bucketName: string;
  objectName: string;
}

export type TemplateParams<T extends string> =
  T extends `${infer _}{${infer Param}}${infer Rest}`
  ? { [K in Param | keyof TemplateParams<Rest>]: string }
  : Record<never, never>;
