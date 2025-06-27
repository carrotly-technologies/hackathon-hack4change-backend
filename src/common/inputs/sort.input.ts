import { Field, InputType } from '@nestjs/graphql';
import { Sort } from '../enum/sort.enum';

@InputType()
export class SortInput {
  @Field(() => Sort)
  direction: Sort;
}
