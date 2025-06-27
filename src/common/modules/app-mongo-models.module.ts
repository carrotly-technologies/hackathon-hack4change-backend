import {
  Example,
  ExampleSchema,
} from "@app/example-module/schemas/example.schema";
import { User, UserSchema } from "@app/user/schemas/user.schema";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const models = [
  { name: Example.name, schema: ExampleSchema },
  { name: User.name, schema: UserSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(models)],
  exports: [MongooseModule.forFeature(models)],
})
export class AppMongoModelsModule {}
