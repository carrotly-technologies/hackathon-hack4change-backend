import { SortInput } from '@app/common/inputs/sort.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExampleFindManySortInput {
  @Field(() => SortInput, { nullable: true })
  name?: SortInput;

  @Field(() => SortInput, { nullable: true })
  color?: SortInput;
}
