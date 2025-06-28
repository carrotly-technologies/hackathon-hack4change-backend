import { SortInput } from '@app/common/inputs/sort.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  name?: SortInput;

  @Field(() => SortInput, { nullable: true })
  time?: SortInput;

  @Field(() => SortInput, { nullable: true })
  eventType?: SortInput;

  @Field(() => SortInput, { nullable: true })
  createdAt?: SortInput;

  @Field(() => SortInput, { nullable: true })
  updatedAt?: SortInput;
}