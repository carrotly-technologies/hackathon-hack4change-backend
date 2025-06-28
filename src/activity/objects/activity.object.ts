import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ActivityDocument } from "@app/activity/schemas/activity.schema";
import { ActivityType } from "@app/activity/enum/activity-type.enum";
import { UserObject } from "@app/user/objects/user.object";

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

  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => UserObject, { nullable: true })
  user?: UserObject;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date, { nullable: true })
  startTime?: Date;

  @Field(() => Date, { nullable: true })
  endTime?: Date;

  @Field(() => Number)
  durationTime: number;

  @Field(() => Number, { nullable: true })
  currentDuration?: number;

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

  @Field(() => [PathPointObject])
  trashLocations: PathPointObject[];

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

    // Calculate current duration for active activities
    if (this.isActive && this.startTime) {
      const currentTime = new Date();
      this.currentDuration = Math.floor(
        (currentTime.getTime() - new Date(this.startTime).getTime()) / 1000,
      );
    }
  }
}
