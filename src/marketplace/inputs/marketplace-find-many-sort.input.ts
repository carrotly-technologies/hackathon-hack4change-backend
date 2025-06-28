import { Field, InputType } from "@nestjs/graphql";
import { SortInput } from "@app/common/inputs/sort.input";

@InputType()
export class MarketplaceFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  name?: SortInput;

  @Field(() => SortInput, { nullable: true })
  price?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}
