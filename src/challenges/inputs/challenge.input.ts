import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ChallengeInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
