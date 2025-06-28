import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

@InputType()
export class PathPointInput {
  @Field(() => String)
  lat: string;

  @Field(() => String)
  lon: string;
}

@InputType()
export class ActivityCreateInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => Number, { defaultValue: 0 })
  durationTime: number;

  @Field(() => Number, { defaultValue: 0 })
  distance: number;

  /* @Field(() => Number)
  trashCount: number; */

  @Field(() => Number, { defaultValue: 0 })
  points: number;

  @Field(() => ActivityType)
  activityType: ActivityType;

  @Field(() => String)
  description: string;

  @Field(() => String)
  name: string;

  @Field(() => [String], { defaultValue: [] })
  imageUrls: string[];

  @Field(() => [PathPointInput], { defaultValue: [] })
  path: PathPointInput[];

  @Field(() => [PathPointInput], { defaultValue: [] })
  trashLocations: PathPointInput[];
}
