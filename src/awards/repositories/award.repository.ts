import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { Award, AwardDocument } from "@app/awards/schemas/award.schema";
import { AwardFindManyInput } from "@app/awards/inputs/award-find-many.input";
import { AwardFindManySortInput } from "@app/awards/inputs/award-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { AwardObject } from "@app/awards/objects/award.object";

@Injectable()
export class AwardRepository {
  constructor(
    @InjectModel(Award.name) private readonly awardModel: Model<AwardDocument>,
  ) {}

  async create(data: Partial<Award>): Promise<AwardDocument> {
    const award = new this.awardModel(data);
    return award.save();
  }

  async findById(id: string): Promise<AwardDocument | null> {
    return this.awardModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Award>,
  ): Promise<AwardDocument | null> {
    return this.awardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<AwardDocument | null> {
    return this.awardModel.findByIdAndDelete(id).exec();
  }

  private serializeQuery(input: AwardFindManyInput) {
    const { iconUrl } = input || {};
    return input
      ? {
          $match: {
            ...(iconUrl && { iconUrl: { $regex: new RegExp(iconUrl, "i") } }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: AwardFindManySortInput) {
    const { iconUrl, createdAt, updatedAt } = sort || {};
    return !Object.values(sort || {}).every((el) => el === undefined)
      ? {
          $sort: {
            ...(iconUrl && { iconUrl: iconUrl.direction }),
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
    input: AwardFindManyInput,
    sort: AwardFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
    const sortQuery = this.serializeSortQuery(sort);
    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [
      { $skip: skipValue },
      { $limit: pageSize },
    ];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.awardModel.aggregate<AwardDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.awardModel.aggregate<{ count: number }>([
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
        return new AwardObject(serializedObj as AwardDocument);
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