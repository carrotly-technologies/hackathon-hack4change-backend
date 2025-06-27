import { AppConfigModule } from '@app/config/config.module';
import { DatabaseConfig } from '@app/config/database.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: DatabaseConfig,
    }),
  ],
})
export class AppDbModule {}
