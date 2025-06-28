import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class MarketplaceInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
