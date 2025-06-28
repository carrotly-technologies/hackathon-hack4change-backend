import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class UserAddChallengeInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  challengeId: string;
} 