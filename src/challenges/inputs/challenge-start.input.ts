import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ChallengeStartInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  challengeId: string;
}
