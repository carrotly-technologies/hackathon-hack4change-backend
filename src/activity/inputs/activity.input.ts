import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ActivityInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
