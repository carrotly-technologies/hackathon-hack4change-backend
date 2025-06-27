import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import {
  Challenge,
  ChallengeDocument,
} from "@app/challenges/schemas/challenge.schema";
import { ChallengeFindManyInput } from "@app/challenges/inputs/challenge-find-many.input";
import { ChallengeFindManySortInput } from "@app/challenges/inputs/challenge-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";

@Injectable()
export class ChallengeRepository {
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDocument>,
  ) {}

  async create(data: Partial<Challenge>): Promise<ChallengeDocument> {
    const challenge = new this.challengeModel(data);
    return challenge.save();
  }

  async findById(id: string): Promise<ChallengeDocument | null> {
    return this.challengeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Challenge>,
  ): Promise<ChallengeDocument | null> {
    return this.challengeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ChallengeDocument | null> {
    return this.challengeModel.findByIdAndDelete(id).exec();
  }

  private serializeQuery(input: ChallengeFindManyInput) {
    const { topic, description, points } = input || {};
    return input
      ? {
          $match: {
            ...(topic && { topic: { $regex: new RegExp(topic, "i") } }),
            ...(description && {
              description: { $regex: new RegExp(description, "i") },
            }),
            ...(points !== undefined && { points }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: ChallengeFindManySortInput) {
    const { topic, description, points, createdAt, updatedAt } = sort || {};
    return !Object.values(sort || {}).every((el) => el === undefined)
      ? {
          $sort: {
            ...(topic && { topic: topic.direction }),
            ...(description && { description: description.direction }),
            ...(points && { points: points.direction }),
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
    input: ChallengeFindManyInput,
    sort: ChallengeFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
    const sortQuery = this.serializeSortQuery(sort);
    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [{ $skip: skipValue }, { $limit: pageSize }];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.challengeModel.aggregate<ChallengeDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.challengeModel.aggregate<{ count: number }>([
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
        return new ChallengeObject(serializedObj as ChallengeDocument);
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
