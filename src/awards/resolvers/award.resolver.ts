import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AwardService } from '@app/awards/services/award.service';
import { AwardObject } from '@app/awards/objects/award.object';
import { AwardCreateInput } from '@app/awards/inputs/award-create.input';
import { AwardUpdateInput } from '@app/awards/inputs/award-update.input';
import { AwardFindManyInput } from '@app/awards/inputs/award-find-many.input';
import { AwardFindManySortInput } from '@app/awards/inputs/award-find-many-sort.input';
import { PaginationInput } from '@app/common/inputs/pagination.input';
import { AwardPaginationResponse } from '@app/awards/responses/award-pagination.response';
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from '@app/common/common.constraints';
import { AwardInput } from '@app/awards/inputs/award.input';

@Resolver(() => AwardObject)
export class AwardResolver {
  constructor(private readonly awardService: AwardService) {}

  @Query(() => AwardObject, { nullable: true })
  async award(@Args(INPUT_KEY) input: AwardInput): Promise<AwardObject | null> {
    return this.awardService.findById(input.id);
  }

  @Query(() => AwardPaginationResponse)
  async awards(
    @Args(INPUT_KEY) input: AwardFindManyInput,
    @Args(INPUT_SORT) sort: AwardFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.awardService.findAll(input, sort, pagination);
  }

  @Mutation(() => AwardObject)
  async awardCreate(@Args(INPUT_KEY) input: AwardCreateInput): Promise<AwardObject> {
    return this.awardService.create(input);
  }

  @Mutation(() => AwardObject, { nullable: true })
  async awardUpdate(@Args(INPUT_KEY) input: AwardUpdateInput): Promise<AwardObject | null> {
    return this.awardService.update(input);
  }

  @Mutation(() => AwardObject, { nullable: true })
  async awardDelete(@Args(INPUT_KEY) input: AwardInput): Promise<AwardObject | null> {
    return this.awardService.delete(input.id);
  }
} 