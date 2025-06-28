import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import {
  Activity,
  ActivityDocument,
} from "@app/activity/schemas/activity.schema";
import { ActivityCreateInput } from "@app/activity/inputs/activity-create.input";
import { ActivityUpdateInput } from "@app/activity/inputs/activity-update.input";
import { ActivityFindManyInput } from "@app/activity/inputs/activity-find-many.input";
import { ActivityFindManySortInput } from "@app/activity/inputs/activity-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async create(input: ActivityCreateInput): Promise<ActivityDocument> {
    const activity = new this.activityModel({
      ...input,
      trashCount: input.trashLocations.length,
    });
    return activity.save();
  }

  async findById(id: string): Promise<ActivityDocument | null> {
    return this.activityModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<ActivityDocument[] | null> {
    return this.activityModel.find({ userId }).exec();
  }

  async update(
    id: string,
    input: ActivityUpdateInput,
  ): Promise<ActivityDocument | null> {
    return this.activityModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ActivityDocument | null> {
    return this.activityModel.findByIdAndDelete(id).exec();
  }

  private serializeQuery(filter: ActivityFindManyInput): PipelineStage {
    const {
      activityType,
      minDurationTime,
      maxDurationTime,
      minDistance,
      maxDistance,
      minTrashCount,
      maxTrashCount,
      minPoints,
      maxPoints,
      name,
      description,
    } = filter;

    const matchConditions: Record<string, any> = {
      ...(activityType && { activityType }),
      ...(name && { name: { $regex: new RegExp(name, "i") } }),
      ...(description && {
        description: { $regex: new RegExp(description, "i") },
      }),
    };

    // Handle range queries
    if (minDurationTime !== undefined || maxDurationTime !== undefined) {
      matchConditions.durationTime = {
        ...(minDurationTime !== undefined && { $gte: minDurationTime }),
        ...(maxDurationTime !== undefined && { $lte: maxDurationTime }),
      };
    }

    if (minDistance !== undefined || maxDistance !== undefined) {
      matchConditions.distance = {
        ...(minDistance !== undefined && { $gte: minDistance }),
        ...(maxDistance !== undefined && { $lte: maxDistance }),
      };
    }

    if (minTrashCount !== undefined || maxTrashCount !== undefined) {
      matchConditions.trashCount = {
        ...(minTrashCount !== undefined && { $gte: minTrashCount }),
        ...(maxTrashCount !== undefined && { $lte: maxTrashCount }),
      };
    }

    if (minPoints !== undefined || maxPoints !== undefined) {
      matchConditions.points = {
        ...(minPoints !== undefined && { $gte: minPoints }),
        ...(maxPoints !== undefined && { $lte: maxPoints }),
      };
    }

    return {
      $match: matchConditions,
    };
  }

  private serializeSortQuery(sort: ActivityFindManySortInput): PipelineStage {
    const {
      durationTime,
      distance,
      trashCount,
      points,
      activityType,
      name,
      createdAt,
      updatedAt,
    } = sort;

    return !Object.values(sort).every((el) => el === undefined)
      ? {
          $sort: {
            ...(durationTime && { durationTime: durationTime.direction }),
            ...(distance && { distance: distance.direction }),
            ...(trashCount && { trashCount: trashCount.direction }),
            ...(points && { points: points.direction }),
            ...(activityType && { activityType: activityType.direction }),
            ...(name && { name: name.direction }),
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

  async findMany(
    filter: ActivityFindManyInput,
    sort: ActivityFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(filter);
    const sortQuery = this.serializeSortQuery(sort);

    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [
      {
        $skip: skipValue,
      },
      {
        $limit: pageSize,
      },
    ];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.activityModel.aggregate<ActivityDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.activityModel.aggregate<{ count: number }>([
      ...aggregation,
      {
        $count: "count",
      },
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
        return serializedObj as ActivityDocument;
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
