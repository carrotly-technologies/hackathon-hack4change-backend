import { PaginateResult } from "@app/common/responses/pagination.response";
import { MarketplaceObject } from "@app/marketplace/objects/marketplace.object";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MarketplacePaginationResponse extends PaginateResult(MarketplaceObject) {} 