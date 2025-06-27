import { Field, InputType } from "@nestjs/graphql";
import { SortInput } from "@app/common/inputs/sort.input";

@InputType()
export class ChallengeFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  topic?: SortInput;

  @Field(() => SortInput, { nullable: true })
  description?: SortInput;

  @Field(() => SortInput, { nullable: true })
  points?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}
