import { PaginateResult } from '@app/common/responses/pagination.response';
import { ExampleObject } from '@app/example-module/objects/example.object';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExamplePaginationResponse extends PaginateResult(ExampleObject) {}
