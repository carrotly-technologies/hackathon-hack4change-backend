import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class AwardInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
