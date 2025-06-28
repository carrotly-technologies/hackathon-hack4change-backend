import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { MarketplaceDocument } from "@app/marketplace/schemas/marketplace.schema";

@ObjectType()
export class MarketplaceObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: MarketplaceDocument | MarketplaceObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as MarketplaceDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
