import {
  INPUT_KEY,
  INPUT_PAGINATION,
  INPUT_SORT,
} from "@app/common/common.constraints";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { Success } from "@app/common/responses/success.response";
import { ExampleCreateInput } from "@app/example-module/inputs/example-create.input";
import { ExampleFindManySortInput } from "@app/example-module/inputs/example-find-many-sort.input";
import { ExampleFindManyInput } from "@app/example-module/inputs/example-find-many.input";
import { ExampleUpdateInput } from "@app/example-module/inputs/example-update.input";
import { ExampleInput } from "@app/example-module/inputs/example.input";
import { ExampleObject } from "@app/example-module/objects/example.object";
import { ExamplePaginationResponse } from "@app/example-module/responses/example-pagination.response";
import { ExampleService } from "@app/example-module/services/example.service";
import { MinioService } from "@app/minio/minio.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(() => ExampleObject)
export class ExampleResolver {
  constructor(
    private readonly exampleService: ExampleService,
    private readonly minioService: MinioService,
  ) { }

  @Query(() => String)
  minioTest() {
    // return this.minioService.sign({
    //   bucketName: "hack4change-54a3ca",
    //   objectName: "test.txt",
    //   expiresAfterSeconds: 3000,
    // });

    return this.minioService.url({
      bucketName: "hack4change-54a3ca",
      objectName: "test.txt",
    });
  }

  @Query(() => ExampleObject)
  async example(@Args(INPUT_KEY) input: ExampleInput) {
    return this.exampleService.getOneById(input.id);
  }

  @Mutation(() => ExampleObject)
  async exampleCreate(@Args(INPUT_KEY) input: ExampleCreateInput) {
    return this.exampleService.create(input);
  }

  @Mutation(() => ExampleObject)
  async exampleUpdate(@Args(INPUT_KEY) input: ExampleUpdateInput) {
    return this.exampleService.updateOneById(input);
  }

  @Mutation(() => Success)
  async exampleDelete(@Args(INPUT_KEY) input: ExampleInput) {
    await this.exampleService.deleteOneById(input.id);
    return new Success();
  }

  @Query(() => ExamplePaginationResponse)
  async examples(
    @Args(INPUT_KEY) input: ExampleFindManyInput,
    @Args(INPUT_SORT) sort: ExampleFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.exampleService.findAll(input, sort, pagination);
  }
}
