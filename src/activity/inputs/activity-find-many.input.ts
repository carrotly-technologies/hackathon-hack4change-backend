import { Field, InputType } from "@nestjs/graphql";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

@InputType()
export class ActivityFindManyInput {
  @Field(() => ActivityType, { nullable: true })
  activityType?: ActivityType;

  @Field(() => Number, { nullable: true })
  minDurationTime?: number;

  @Field(() => Number, { nullable: true })
  maxDurationTime?: number;

  @Field(() => Number, { nullable: true })
  minDistance?: number;

  @Field(() => Number, { nullable: true })
  maxDistance?: number;

  @Field(() => Number, { nullable: true })
  minTrashCount?: number;

  @Field(() => Number, { nullable: true })
  maxTrashCount?: number;

  @Field(() => Number, { nullable: true })
  minPoints?: number;

  @Field(() => Number, { nullable: true })
  maxPoints?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
