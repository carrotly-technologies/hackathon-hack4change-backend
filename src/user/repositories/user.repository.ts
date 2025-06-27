import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { User, UserDocument } from "@app/user/schemas/user.schema";
import { UserFindManyInput } from "@app/user/inputs/user-find-many.input";
import { UserFindManySortInput } from "@app/user/inputs/user-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { UserObject } from "@app/user/objects/user.object";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userData: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findMany(
    filter: Partial<User> = {},
    sort: Record<string, 1 | -1> = {},
    limit?: number,
    skip?: number,
  ): Promise<UserDocument[]> {
    let query = this.userModel.find(filter);

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
    updateData: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async count(filter: Partial<User> = {}): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }

  private serializeQuery(input: UserFindManyInput) {
    const { email, firstname, lastname, points } = input || {};
    return input
      ? {
          $match: {
            ...(email && { email: { $regex: new RegExp(email, "i") } }),
            ...(firstname && {
              firstname: { $regex: new RegExp(firstname, "i") },
            }),
            ...(lastname && {
              lastname: { $regex: new RegExp(lastname, "i") },
            }),
            ...(points !== undefined && { points }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: UserFindManySortInput) {
    const { email, firstname, lastname, points, createdAt, updatedAt } =
      sort || {};
    return !Object.values(sort || {}).every((el) => el === undefined)
      ? {
          $sort: {
            ...(email && { email: email.direction }),
            ...(firstname && { firstname: firstname.direction }),
            ...(lastname && { lastname: lastname.direction }),
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
    input: UserFindManyInput,
    sort: UserFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
    const sortQuery = this.serializeSortQuery(sort);
    const { pageSize, page, skipValue } = pagination;

    const pipelinePagination = [{ $skip: skipValue }, { $limit: pageSize }];

    const aggregation: PipelineStage[] = [matchQuery, sortQuery];

    const data = await this.userModel.aggregate<UserDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.userModel.aggregate<{ count: number }>([
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
        return new UserObject(serializedObj as UserDocument);
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
