import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ActivityAddScoreInput {
  @Field(() => GraphQLObjectID)
  activityId: string;

  @Field(() => Number)
  points: number;
}
