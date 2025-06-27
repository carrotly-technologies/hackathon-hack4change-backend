import { PaginateResult } from "@app/common/responses/pagination.response";
import { AwardObject } from "@app/awards/objects/award.object";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AwardPaginationResponse extends PaginateResult(AwardObject) {}
