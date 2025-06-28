import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MarketplaceService } from "@app/marketplace/services/marketplace.service";
import { MarketplaceObject } from "@app/marketplace/objects/marketplace.object";
import { MarketplaceFindManyInput } from "@app/marketplace/inputs/marketplace-find-many.input";
import { MarketplaceFindManySortInput } from "@app/marketplace/inputs/marketplace-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { MarketplacePaginationResponse } from "@app/marketplace/responses/marketplace-pagination.response";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";
import { MarketplaceInput } from "@app/marketplace/inputs/marketplace.input";
import { MarketplaceCreateInput } from "@app/marketplace/inputs/marketplace-create.input";
import { MarketplaceUpdateInput } from "@app/marketplace/inputs/marketplace-update.input";
import { MarketplacePurchaseInput } from "@app/marketplace/inputs/marketplace-purchase.input";

@Resolver(() => MarketplaceObject)
export class MarketplaceResolver {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Query(() => MarketplaceObject, { nullable: true })
  async marketplace(
    @Args(INPUT_KEY) input: MarketplaceInput,
  ): Promise<MarketplaceObject | null> {
    return this.marketplaceService.findById(input.id);
  }

  @Query(() => MarketplacePaginationResponse)
  async marketplaces(
    @Args(INPUT_KEY) input: MarketplaceFindManyInput,
    @Args(INPUT_SORT) sort: MarketplaceFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.marketplaceService.findAll(input, sort, pagination);
  }

  @Mutation(() => MarketplaceObject)
  async marketplaceCreate(
    @Args(INPUT_KEY) input: MarketplaceCreateInput,
  ): Promise<MarketplaceObject> {
    return this.marketplaceService.create(input);
  }

  @Mutation(() => MarketplaceObject, { nullable: true })
  async marketplaceUpdate(
    @Args(INPUT_KEY) input: MarketplaceUpdateInput,
  ): Promise<MarketplaceObject | null> {
    return this.marketplaceService.update(input);
  }

  @Mutation(() => MarketplaceObject, { nullable: true })
  async marketplaceDelete(
    @Args(INPUT_KEY) input: MarketplaceInput,
  ): Promise<MarketplaceObject | null> {
    return this.marketplaceService.delete(input.id);
  }

  @Mutation(() => MarketplaceObject)
  async marketplacePurchase(
    @Args(INPUT_KEY) input: MarketplacePurchaseInput,
  ): Promise<MarketplaceObject> {
    return this.marketplaceService.purchase(input);
  }
}
