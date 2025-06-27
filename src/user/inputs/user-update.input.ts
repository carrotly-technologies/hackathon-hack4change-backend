import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class UserUpdateInput {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => Number, { nullable: true })
  points?: number;

  @Field(() => [GraphQLObjectID], { nullable: true })
  awardIds?: string[];

  @Field(() => [GraphQLObjectID], { nullable: true })
  challengeIds?: string[];
}
