import { ExampleRepository } from '@app/example-module/repositories/example.repository';
import { ExampleResolver } from '@app/example-module/resolvers/example.resolver';
import { ExampleService } from '@app/example-module/services/example.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ExampleResolver, ExampleService, ExampleRepository],
})
export class ExampleModule {}
