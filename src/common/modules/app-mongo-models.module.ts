import {
  Example,
  ExampleSchema,
} from "@app/example-module/schemas/example.schema";
import { User, UserSchema } from "@app/user/schemas/user.schema";
import { Award, AwardSchema } from "@app/awards/schemas/award.schema";
import {
  Challenge,
  ChallengeSchema,
} from "@app/challenges/schemas/challenge.schema";
import {
  Activity,
  ActivitySchema,
} from "@app/activity/schemas/activity.schema";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

const models = [
  { name: Example.name, schema: ExampleSchema },
  { name: User.name, schema: UserSchema },
  { name: Award.name, schema: AwardSchema },
  { name: Challenge.name, schema: ChallengeSchema },
  { name: Activity.name, schema: ActivitySchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(models)],
  exports: [MongooseModule.forFeature(models)],
})
export class AppMongoModelsModule {}
