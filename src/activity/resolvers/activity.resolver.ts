import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { ActivityService } from "@app/activity/services/activity.service";
import {
  ActivityObject,
  PathPointObject,
} from "@app/activity/objects/activity.object";
import { ActivityPaginationResponse } from "@app/activity/responses/activity-pagination.response";
import { ActivityInput } from "@app/activity/inputs/activity.input";
import { ActivityCreateInput } from "@app/activity/inputs/activity-create.input";
import { ActivityUpdateInput } from "@app/activity/inputs/activity-update.input";
import { ActivityFindManyInput } from "@app/activity/inputs/activity-find-many.input";
import { ActivityFindManySortInput } from "@app/activity/inputs/activity-find-many-sort.input";
import { ActivityStartInput } from "@app/activity/inputs/activity-start.input";
import { ActivityEndInput } from "@app/activity/inputs/activity-end.input";
import { ActivityAddScoreInput } from "@app/activity/inputs/activity-add-score.input";
import { ActivityAddTrashInput } from "@app/activity/inputs/activity-add-trash.input";
import { ActivityAddPathPointInput } from "@app/activity/inputs/activity-add-point.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { UserService } from "@app/user/services/user.service";
import { UserObject } from "@app/user/objects/user.object";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";

@Resolver(() => ActivityObject)
export class ActivityResolver {
  constructor(
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  @ResolveField(() => UserObject, { nullable: true })
  async user(@Parent() activity: ActivityObject): Promise<UserObject | null> {
    return this.userService.findById(activity.userId);
  }

  @Query(() => ActivityObject, { nullable: true })
  async activity(
    @Args(INPUT_KEY) input: ActivityInput,
  ): Promise<ActivityObject | null> {
    return this.activityService.findById(input.id);
  }

  @Query(() => ActivityObject, { nullable: true })
  async activityStarted(
    @Args("userId") userId: string,
  ): Promise<ActivityObject | null> {
    return this.activityService.findActiveByUserId(userId);
  }

  @Query(() => [PathPointObject])
  async activitiesThrashMap() {
    return await this.activityService.thrashMap();
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

  @Mutation(() => ActivityObject)
  async activityStart(
    @Args(INPUT_KEY) input: ActivityStartInput,
  ): Promise<ActivityObject> {
    return this.activityService.startActivity(input);
  }

  @Mutation(() => ActivityObject)
  async activityEnd(
    @Args(INPUT_KEY) input: ActivityEndInput,
  ): Promise<ActivityObject> {
    return this.activityService.endActivity(input);
  }

  @Mutation(() => ActivityObject)
  async activityAddScore(
    @Args(INPUT_KEY) input: ActivityAddScoreInput,
  ): Promise<ActivityObject> {
    return this.activityService.addScore(input);
  }

  @Mutation(() => ActivityObject)
  async activityAddTrash(
    @Args(INPUT_KEY) input: ActivityAddTrashInput,
  ): Promise<ActivityObject> {
    return this.activityService.addTrash(input);
  }

  @Mutation(() => ActivityObject)
  async activityAddPathPoint(
    @Args(INPUT_KEY) input: ActivityAddPathPointInput,
  ): Promise<ActivityObject> {
    return this.activityService.addPathPoint(input);
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

  @Query(() => Number, { nullable: true })
  async activityCurrentDuration(
    @Args("activityId") activityId: string,
  ): Promise<number | null> {
    return this.activityService.getCurrentDuration(activityId);
  }
}
