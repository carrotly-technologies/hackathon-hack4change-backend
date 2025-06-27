import { Field, InputType } from "@nestjs/graphql";
import { SortInput } from "@app/common/inputs/sort.input";

@InputType()
export class AwardFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  iconUrl?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}
