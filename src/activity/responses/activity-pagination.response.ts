import { ObjectType } from "@nestjs/graphql";
import { PaginateResult } from "@app/common/responses/pagination.response";
import { ActivityObject } from "@app/activity/objects/activity.object";

@ObjectType()
export class ActivityPaginationResponse extends PaginateResult(
  ActivityObject,
) {}
