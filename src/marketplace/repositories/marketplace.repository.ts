import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import {
  Marketplace,
  MarketplaceDocument,
} from "@app/marketplace/schemas/marketplace.schema";
import { MarketplaceFindManyInput } from "@app/marketplace/inputs/marketplace-find-many.input";
import { MarketplaceFindManySortInput } from "@app/marketplace/inputs/marketplace-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { MarketplaceObject } from "@app/marketplace/objects/marketplace.object";

@Injectable()
export class MarketplaceRepository {
  constructor(
    @InjectModel(Marketplace.name)
    private readonly marketplaceModel: Model<MarketplaceDocument>,
  ) {}

  async create(
    marketplaceData: Partial<Marketplace>,
  ): Promise<MarketplaceDocument> {
    const marketplace = new this.marketplaceModel(marketplaceData);
    return marketplace.save();
  }

  async findById(id: string): Promise<MarketplaceDocument | null> {
    return this.marketplaceModel.findById(id).exec();
  }

  async findMany(
    filter: Partial<Marketplace> = {},
    sort: Record<string, 1 | -1> = {},
    limit?: number,
    skip?: number,
  ): Promise<MarketplaceDocument[]> {
    let query = this.marketplaceModel.find(filter);

    if (Object.keys(sort).length > 0) {
      query = query.sort(sort);
    }

    if (skip) {
      query = query.skip(skip);
    }

    if (limit) {
      query = query.limit(limit);
    }

    return query.exec();
  }

  async update(
    id: string,
    updateData: Partial<Marketplace>,
  ): Promise<MarketplaceDocument | null> {
    return this.marketplaceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<MarketplaceDocument | null> {
    return this.marketplaceModel.findByIdAndDelete(id).exec();
  }

  async count(filter: Partial<Marketplace> = {}): Promise<number> {
    return this.marketplaceModel.countDocuments(filter).exec();
  }

  private serializeQuery(input: MarketplaceFindManyInput) {
    const { name, description } = input || {};
    return input
      ? {
          $match: {
            ...(name && { name: { $regex: new RegExp(name, "i") } }),
            ...(description && {
              description: { $regex: new RegExp(description, "i") },
            }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: MarketplaceFindManySortInput) {
    const { name, price, createdAt, updatedAt } = sort || {};
    return !Object.values(sort || {}).every((el) => el === undefined)
      ? {
          $sort: {
            ...(name && { name: name.direction }),
            ...(price && { price: price.direction }),
            ...(createdAt && { createdAt: createdAt.direction }),
            ...(updatedAt && { updatedAt: updatedAt.direction }),
          },
        }
      : {
          $sort: {
            createdAt: -1 as const,
          },
        };
  }

  async findAll(
    input: MarketplaceFindManyInput,
    sort: MarketplaceFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
    const sortQuery = this.serializeSortQuery(sort);
    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [{ $skip: skipValue }, { $limit: pageSize }];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.marketplaceModel.aggregate<MarketplaceDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.marketplaceModel.aggregate<{ count: number }>([
      ...aggregation,
      { $count: "count" },
    ]);

    const totalPages = dataCount[0]?.count
      ? Math.ceil(dataCount[0].count / pageSize)
      : 0;

    return {
      data: data.map((obj) => {
        const serializedObj = {
          id: obj._id.toString(),
          ...obj,
        };
        return new MarketplaceObject(serializedObj as MarketplaceDocument);
      }),
      metadata: {
        currentPage: page,
        pageSize,
        totalCount: dataCount[0]?.count || 0,
        totalPages,
      },
    };
  }
}
