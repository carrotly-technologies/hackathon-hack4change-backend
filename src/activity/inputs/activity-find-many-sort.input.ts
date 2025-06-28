import { Field, InputType } from "@nestjs/graphql";
import { SortInput } from "@app/common/inputs/sort.input";

@InputType()
export class ActivityFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  durationTime?: SortInput;

  @Field(() => SortInput, { nullable: true })
  distance?: SortInput;

  @Field(() => SortInput, { nullable: true })
  trashCount?: SortInput;

  @Field(() => SortInput, { nullable: true })
  points?: SortInput;

  @Field(() => SortInput, { nullable: true })
  activityType?: SortInput;

  @Field(() => SortInput, { nullable: true })
  name?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}
