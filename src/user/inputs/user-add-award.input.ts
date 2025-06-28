import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class UserAddAwardInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  awardId: string;
} 