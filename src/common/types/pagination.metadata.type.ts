import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
  @Field(() => Int)
  currentPage!: number;

  @Field(() => Int)
  pageSize!: number;

  @Field(() => Int)
  totalCount!: number;

  @Field(() => Int)
  totalPages!: number;
}
