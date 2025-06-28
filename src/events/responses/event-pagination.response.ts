import { PaginateResult } from "@app/common/responses/pagination.response";
import { EventObject } from "@app/events/objects/event.object";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EventPaginationResponse extends PaginateResult(EventObject) { }