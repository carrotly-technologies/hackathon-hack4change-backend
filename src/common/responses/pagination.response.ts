import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetadata } from '../types/pagination.metadata.type';
import { Type } from '@nestjs/common';

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data!: T[];

    @Field(() => PaginationMetadata, { nullable: false })
    metadata!: PaginationMetadata;
  }

  return PageClass;
}
