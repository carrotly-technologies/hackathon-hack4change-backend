import { PaginationInput } from '@app/common/inputs/pagination.input';
import { ExampleNameNotUniqueError } from '@app/example-module/errors/example-name-not-unique.error';
import { ExampleCreateInput } from '@app/example-module/inputs/example-create.input';
import { ExampleFindManySortInput } from '@app/example-module/inputs/example-find-many-sort.input';
import { ExampleFindManyInput } from '@app/example-module/inputs/example-find-many.input';
import { ExampleUpdateInput } from '@app/example-module/inputs/example-update.input';
import { ExampleRepository } from '@app/example-module/repositories/example.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async create(input: ExampleCreateInput) {
    if (await this.exampleRepository.findOneByName(input.name)) {
      throw new ExampleNameNotUniqueError();
    }
    return this.exampleRepository.create(input);
  }

  async getOneById(id: string) {
    return this.exampleRepository.getOneById(id);
  }

  async deleteOneById(id: string) {
    return this.exampleRepository.deleteOneById(id);
  }

  async updateOneById(input: ExampleUpdateInput) {
    return this.exampleRepository.updateOneById(input.id, input);
  }

  async findAll(
    input: ExampleFindManyInput,
    sort: ExampleFindManySortInput,
    pagination: PaginationInput,
  ) {
    return this.exampleRepository.findAll(input, sort, pagination);
  }
}
