import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@ObjectType()
export class LeaderboardEntryObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => Number)
  totalPoints: number;

  @Field(() => Number)
  activityPoints: number;

  @Field(() => Number)
  challengePoints: number;

  @Field(() => Number)
  rank: number;

  constructor(input: any) {
    Object.assign(this, input);
  }
}
