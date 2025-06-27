import { PaginationInput } from '@app/common/inputs/pagination.input';
import { ExampleNotFoundError } from '@app/example-module/errors/example-not-found.error';
import { ExampleFindManySortInput } from '@app/example-module/inputs/example-find-many-sort.input';
import { ExampleFindManyInput } from '@app/example-module/inputs/example-find-many.input';
import { ExampleObject } from '@app/example-module/objects/example.object';
import {
  Example,
  ExampleDocument,
} from '@app/example-module/schemas/example.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

@Injectable()
export class ExampleRepository {
  constructor(
    @InjectModel(Example.name)
    private readonly exampleModel: Model<ExampleDocument>,
  ) {}

  async create(data: Partial<Example>): Promise<ExampleDocument> {
    const example = new this.exampleModel(data);
    return example.save();
  }

  async deleteOneById(id: string) {
    const example = await this.exampleModel.findByIdAndDelete(id);
    if (!example) {
      throw new ExampleNotFoundError();
    }
    return example;
  }

  async updateOneById(id: string, data: Partial<Example>) {
    const example = await this.exampleModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!example) {
      throw new ExampleNotFoundError();
    }
    return example;
  }

  async findOneByName(name: string) {
    return this.exampleModel.findOne({ name });
  }

  async findOneById(id: string) {
    return this.exampleModel.findById(id);
  }

  async getOneById(id: string) {
    const example = await this.findOneById(id);
    if (!example) {
      throw new ExampleNotFoundError();
    }
    return example;
  }

  private serializeQuery(input: ExampleFindManyInput) {
    const { name, color } = input;
    return input
      ? {
          $match: {
            ...(name && { name: { $regex: new RegExp(name, 'i') } }),
            ...(color && { color: { $in: color } }),
          },
        }
      : {
          $match: {},
        };
  }

  private serializeSortQuery(sort: ExampleFindManySortInput) {
    const { name, color } = sort;
    return !Object.values(sort).every((el) => el === undefined)
      ? {
          $sort: {
            ...(name && { name: name.direction }),
            ...(color && { color: color.direction }),
          },
        }
      : {
          $sort: {
            name: -1 as const,
          },
        };
  }

  async findAll(
    input: ExampleFindManyInput,
    sort: ExampleFindManySortInput,
    pagination: PaginationInput,
  ) {
    const matchQuery = this.serializeQuery(input);
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

    const data = await this.exampleModel.aggregate<ExampleDocument>([
      ...aggregation,
      ...pipelinePagination,
    ]);
    const dataCount = await this.exampleModel.aggregate<{ count: number }>([
      ...aggregation,
      {
        $count: 'count',
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
        return new ExampleObject(serializedObj as ExampleDocument);
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
