import { Inject, Injectable } from "@nestjs/common";
import { Client, S3Error } from "minio";
import { firstValueFrom, from } from "rxjs";
import { timeout } from "rxjs/operators";
import {
  FIFTEEN_MINUTES_IN_SECONDS,
  MINIO_OPTIONS_TOKEN,
  THIRTY_SECONDS,
} from "./minio.consts";
import { safeAsync } from "./minio.functions";
import { MinioOptions } from "./minio.options";
import {
  DeleteArgs,
  ExistsArgs,
  GetArgs,
  ListArgs,
  SignArgs,
  UploadArgs,
  UrlArgs,
} from "./minio.types";

@Injectable()
export class MinioService {
  private minio: Client;

  constructor(
    @Inject(MINIO_OPTIONS_TOKEN)
    private readonly options: MinioOptions,
  ) {
    this.minio = new Client({
      endPoint: this.options.endpoint,
      port: this.options.port,
      accessKey: this.options.accessKey,
      secretKey: this.options.secretKey,
      useSSL: this.options.useSSL,
    });
  }

  getClient = () => this.minio;

  async exists(args: ExistsArgs) {
    const { error } = await safeAsync(() =>
      this.minio.statObject(args.bucketName, args.objectName),
    );

    if (error instanceof S3Error && error.code === "NotFound") {
      return false;
    }

    if (error) {
      throw error;
    }

    return true;
  }

  async get(args: GetArgs) {
    return this.minio.getObject(args.bucketName, args.objectName);
  }

  async list(args: ListArgs) {
    return this.minio.listObjects(
      args.bucketName,
      args.prefix,
      args.recursive,
      args.listOpts,
    );
  }

  async upload(args: UploadArgs) {
    return this.minio.putObject(
      args.bucketName,
      args.objectName,
      args.data,
      args.size,
      args.metadata,
    );
  }

  async delete(args: DeleteArgs) {
    return this.minio.removeObject(args.bucketName, args.objectName);
  }

  async sign(args: SignArgs) {
    const {
      bucketName,
      objectName,
      expiresAfterSeconds = FIFTEEN_MINUTES_IN_SECONDS,
      method = "GET",
    } = args;
    const signed = await this.minio.presignedUrl(
      method,
      bucketName,
      objectName,
      expiresAfterSeconds,
    );

    return this.options.publicUrl
      ? signed.replace(
          /^http[s]?:\/\/.*?\//,
          this.options.publicUrl.replace(/\/$/, "") + "/",
        )
      : signed;
  }

  url(args: UrlArgs) {
    const protocol = this.options.useSSL ? "https" : "http";
    const host = this.options.endpoint.toLowerCase();
    const port =
      this.options.port === 80 || this.options.port === 443
        ? ""
        : `:${this.options.port}`;

    const url = `${protocol}://${host}${port}/${args.bucketName}/${args.objectName}`;

    return this.options.publicUrl
      ? url.replace(
          /^http[s]?:\/\/.*?\//,
          this.options.publicUrl.replace(/\/$/, "") + "/",
        )
      : url;
  }

  async checkConnection(timeoutAfterSeconds: number = THIRTY_SECONDS) {
    return await firstValueFrom(
      from(this.minio.listBuckets()).pipe(timeout(timeoutAfterSeconds * 1000)),
    )
      .then(() => true)
      .catch(() => false);
  }
}
