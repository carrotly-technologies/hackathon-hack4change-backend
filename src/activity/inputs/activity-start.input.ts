import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

@InputType()
export class ActivityStartInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => ActivityType)
  activityType: ActivityType;
}
