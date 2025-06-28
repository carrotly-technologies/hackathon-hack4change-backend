import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class MarketplacePurchaseInput {
  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  marketplaceId: string;
}
