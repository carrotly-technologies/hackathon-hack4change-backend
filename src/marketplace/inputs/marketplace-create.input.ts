import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MarketplaceCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  price: number;
}
