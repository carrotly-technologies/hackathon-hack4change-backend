import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class UserCreateInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => [GraphQLObjectID], { nullable: true })
  awardIds?: string[];

  @Field(() => [GraphQLObjectID], { nullable: true })
  challengeIds?: string[];
}
