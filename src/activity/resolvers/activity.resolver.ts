import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActivityService } from "@app/activity/services/activity.service";
import { ActivityObject } from "@app/activity/objects/activity.object";
import { ActivityPaginationResponse } from "@app/activity/responses/activity-pagination.response";
import { ActivityInput } from "@app/activity/inputs/activity.input";
import { ActivityCreateInput } from "@app/activity/inputs/activity-create.input";
import { ActivityUpdateInput } from "@app/activity/inputs/activity-update.input";
import { ActivityFindManyInput } from "@app/activity/inputs/activity-find-many.input";
import { ActivityFindManySortInput } from "@app/activity/inputs/activity-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";

@Resolver(() => ActivityObject)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query(() => ActivityObject, { nullable: true })
  async activity(
    @Args(INPUT_KEY) input: ActivityInput,
  ): Promise<ActivityObject | null> {
    return this.activityService.findById(input.id);
  }

  @Query(() => ActivityPaginationResponse)
  async activities(
    @Args(INPUT_KEY) filter: ActivityFindManyInput,
    @Args(INPUT_SORT) sort: ActivityFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ): Promise<ActivityPaginationResponse> {
    return this.activityService.findMany(filter, sort, pagination);
  }

  @Mutation(() => ActivityObject)
  async activityCreate(
    @Args(INPUT_KEY) input: ActivityCreateInput,
  ): Promise<ActivityObject> {
    return this.activityService.create(input);
  }

  @Mutation(() => ActivityObject, { nullable: true })
  async activityUpdate(
    @Args(INPUT_KEY) input: ActivityUpdateInput,
  ): Promise<ActivityObject | null> {
    return this.activityService.update(input.id, input);
  }

  @Mutation(() => ActivityObject, { nullable: true })
  async activityDelete(
    @Args(INPUT_KEY) input: ActivityInput,
  ): Promise<ActivityObject | null> {
    return this.activityService.delete(input.id);
  }
}
