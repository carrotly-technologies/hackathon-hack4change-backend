import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "@app/user/services/user.service";
import { UserObject } from "@app/user/objects/user.object";
import { UserFindManyInput } from "@app/user/inputs/user-find-many.input";
import { UserFindManySortInput } from "@app/user/inputs/user-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { UserPaginationResponse } from "@app/user/responses/user-pagination.response";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";
import { UserInput } from "@app/user/inputs/user.input";
import { UserCreateInput } from "@app/user/inputs/user-create.input";

@Resolver(() => UserObject)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserObject, { nullable: true })
  async user(@Args(INPUT_KEY) input: UserInput): Promise<UserObject | null> {
    return this.userService.findById(input.id);
  }

  @Mutation(() => UserObject)
  async userCreate(
    @Args(INPUT_KEY) input: UserCreateInput,
  ): Promise<UserObject> {
    return this.userService.create(input);
  }

  @Query(() => UserPaginationResponse)
  async users(
    @Args(INPUT_KEY) input: UserFindManyInput,
    @Args(INPUT_SORT) sort: UserFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.userService.findAll(input, sort, pagination);
  }
}
