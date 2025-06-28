import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ActivityDocument } from "@app/activity/schemas/activity.schema";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

@ObjectType()
export class PathPointObject {
  @Field(() => String)
  lat: string;

  @Field(() => String)
  lon: string;
}

@ObjectType()
export class ActivityObject {
  @Field(() => GraphQLObjectID)
  id: string;

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

  @Field(() => [PathPointObject])
  path: PathPointObject[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: ActivityDocument | ActivityObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as ActivityDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
