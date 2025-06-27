import { Field, InputType } from "@nestjs/graphql";
import { SortInput } from "@app/common/inputs/sort.input";

@InputType()
export class UserFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  email?: SortInput;

  @Field(() => SortInput, { nullable: true })
  firstname?: SortInput;

  @Field(() => SortInput, { nullable: true })
  lastname?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}
