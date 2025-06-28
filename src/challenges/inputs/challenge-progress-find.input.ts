import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ChallengeProgressFindInput {
  @Field(() => GraphQLObjectID, { nullable: true })
  userId?: string;

  @Field(() => GraphQLObjectID, { nullable: true })
  challengeId?: string;
}
