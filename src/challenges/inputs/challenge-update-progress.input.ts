import { InputType, Field, Int } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ChallengeUpdateProgressInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  challengeId: string;

  @Field(() => Int, { description: "Progress percentage from 0 to 100" })
  progress: number;
}
