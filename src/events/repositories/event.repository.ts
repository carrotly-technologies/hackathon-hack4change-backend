import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { Event, EventDocument } from "../schemas/event.schema";
import { EventCreateInput } from "../inputs/event-create.input";
import { EventUpdateInput } from "../inputs/event-update.input";
import { EventFindManyInput } from "@app/events/inputs/event-find-many.input";
import { EventFindManySortInput } from "@app/events/inputs/event-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { EventObject } from "@app/events/objects/event.object";

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(data: EventCreateInput): Promise<EventDocument> {
    const event = new this.eventModel(data);
    return event.save();
  }

  async findOneByName(name: string): Promise<EventDocument | null> {
    return this.eventModel.findOne({ name }).exec();
  }

  async findOneById(id: string): Promise<EventDocument | null> {
    return this.eventModel.findById(id).exec();
  }

  async updateOneById(
    id: string,
    data: EventUpdateInput,
  ): Promise<EventDocument | null> {
    return this.eventModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteOneById(id: string): Promise<EventDocument | null> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }

  private serializeQuery(input: EventFindManyInput) {
    const { name, eventType } = input || {};
    return input
      ? {
          $match: {
            ...(name && { name: { $regex: new RegExp(name, "i") } }),
            ...(eventType && { eventType }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: EventFindManySortInput) {
    const { name, time, eventType, createdAt, updatedAt } = sort || {};
    return !Object.values(sort || {}).every((el) => el === undefined)
      ? {
          $sort: {
            ...(name && { name: name.direction }),
            ...(time && { time: time.direction }),
            ...(eventType && { eventType: eventType.direction }),
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
    input: EventFindManyInput,
    sort: EventFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
    const sortQuery = this.serializeSortQuery(sort);
    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [{ $skip: skipValue }, { $limit: pageSize }];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.eventModel.aggregate<EventDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.eventModel.aggregate<{ count: number }>([
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
        return new EventObject(serializedObj as EventDocument);
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
