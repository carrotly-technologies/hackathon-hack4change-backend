import { Injectable } from "@nestjs/common";
import { MarketplaceRepository } from "@app/marketplace/repositories/marketplace.repository";
import { UserService } from "@app/user/services/user.service";
import { MarketplaceCreateInput } from "@app/marketplace/inputs/marketplace-create.input";
import { MarketplaceUpdateInput } from "@app/marketplace/inputs/marketplace-update.input";
import { MarketplaceFindManyInput } from "@app/marketplace/inputs/marketplace-find-many.input";
import { MarketplaceFindManySortInput } from "@app/marketplace/inputs/marketplace-find-many-sort.input";
import { MarketplacePurchaseInput } from "@app/marketplace/inputs/marketplace-purchase.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { MarketplaceObject } from "@app/marketplace/objects/marketplace.object";
import { MarketplacePaginationResponse } from "@app/marketplace/responses/marketplace-pagination.response";
import { MarketplaceNotFoundError } from "@app/marketplace/errors/marketplace-not-found.error";
import { MarketplaceInsufficientCoinsError } from "@app/marketplace/errors/marketplace-insufficient-coins.error";

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly marketplaceRepository: MarketplaceRepository,
    private readonly userService: UserService,
  ) {}

  async create(input: MarketplaceCreateInput): Promise<MarketplaceObject> {
    if (input.price < 0) {
      throw new Error("Price cannot be negative");
    }

    const marketplace = await this.marketplaceRepository.create(input);
    return new MarketplaceObject(marketplace);
  }

  async findById(id: string): Promise<MarketplaceObject | null> {
    const marketplace = await this.marketplaceRepository.findById(id);
    return marketplace ? new MarketplaceObject(marketplace) : null;
  }

  async findAll(
    input: MarketplaceFindManyInput,
    sort: MarketplaceFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof MarketplacePaginationResponse>> {
    return this.marketplaceRepository.findAll(input, sort, pagination);
  }

  async update(
    input: MarketplaceUpdateInput,
  ): Promise<MarketplaceObject | null> {
    if (input.price !== undefined && input.price < 0) {
      throw new Error("Price cannot be negative");
    }

    const marketplace = await this.marketplaceRepository.update(
      input.id,
      input,
    );
    return marketplace ? new MarketplaceObject(marketplace) : null;
  }

  async delete(id: string): Promise<MarketplaceObject | null> {
    const marketplace = await this.marketplaceRepository.delete(id);
    return marketplace ? new MarketplaceObject(marketplace) : null;
  }

  async purchase(input: MarketplacePurchaseInput): Promise<MarketplaceObject> {
    // Find the marketplace item
    const marketplace = await this.marketplaceRepository.findById(
      input.marketplaceId,
    );
    if (!marketplace) {
      throw new MarketplaceNotFoundError();
    }

    // Get user to check current coin balance
    const user = await this.userService.findById(input.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has enough coins
    if (user.coin < marketplace.price) {
      throw new MarketplaceInsufficientCoinsError();
    }

    // Subtract coins from user
    await this.userService.subtractCoinsFromUser(
      input.userId,
      marketplace.price,
    );

    return new MarketplaceObject(marketplace);
  }
}
