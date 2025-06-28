import { Field, InputType } from "@nestjs/graphql";
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
  @Field(() => Number)
  durationTime: number;

  @Field(() => Number)
  distance: number;

  @Field(() => Number)
  trashCount: number;

  @Field(() => Number)
  points: number;

  @Field(() => ActivityType)
  activityType: ActivityType;

  @Field(() => String)
  description: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => [PathPointInput])
  path: PathPointInput[];
}
