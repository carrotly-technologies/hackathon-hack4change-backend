import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class UserInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
