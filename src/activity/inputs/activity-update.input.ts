import { Field, InputType } from "@nestjs/graphql";
import { ActivityType } from "@app/activity/enum/activity-type.enum";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class PathPointUpdateInput {
  @Field(() => String, { nullable: true })
  lat?: string;

  @Field(() => String, { nullable: true })
  lon?: string;
}

@InputType()
export class ActivityUpdateInput {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => Number, { nullable: true })
  durationTime?: number;

  @Field(() => Number, { nullable: true })
  distance?: number;

  @Field(() => Number, { nullable: true })
  trashCount?: number;

  @Field(() => Number, { nullable: true })
  points?: number;

  @Field(() => ActivityType, { nullable: true })
  activityType?: ActivityType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  imageUrls?: string[];

  @Field(() => [PathPointUpdateInput], { nullable: true })
  path?: PathPointUpdateInput[];
}
