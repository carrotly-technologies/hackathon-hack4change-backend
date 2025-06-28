import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MarketplaceFindManyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
