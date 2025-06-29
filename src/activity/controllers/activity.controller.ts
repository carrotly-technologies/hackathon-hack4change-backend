import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ActivityService } from "@app/activity/services/activity.service";
import { UserService } from "@app/user/services/user.service";
import {
  ActivityObject,
  PathPointObject,
} from "@app/activity/objects/activity.object";
import { ActivityPaginationResponse } from "@app/activity/responses/activity-pagination.response";
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

@Controller("activities")
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  @Get(":id")
  async getActivity(@Param("id") id: string): Promise<ActivityObject | null> {
    return this.activityService.findById(id);
  }

  @Get("user/:userId/started")
  async getActivityStarted(
    @Param("userId") userId: string,
  ): Promise<ActivityObject | null> {
    return this.activityService.findActiveByUserId(userId);
  }

  @Get("trash-map")
  async getActivitiesThrashMap(): Promise<PathPointObject[]> {
    return await this.activityService.thrashMap();
  }

  @Get()
  async getActivities(
    @Query() filter: ActivityFindManyInput,
    @Query() sort: ActivityFindManySortInput,
    @Query() pagination: PaginationInput,
  ): Promise<ActivityPaginationResponse> {
    return this.activityService.findMany(filter, sort, pagination);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createActivity(
    @Body() input: ActivityCreateInput,
  ): Promise<ActivityObject> {
    return this.activityService.create(input);
  }

  @Post("start")
  async startActivity(
    @Body() input: ActivityStartInput,
  ): Promise<ActivityObject> {
    return this.activityService.startActivity(input);
  }

  @Post("end")
  async endActivity(@Body() input: ActivityEndInput): Promise<ActivityObject> {
    return this.activityService.endActivity(input);
  }

  @Post("add-score")
  async addScore(
    @Body() input: ActivityAddScoreInput,
  ): Promise<ActivityObject> {
    return this.activityService.addScore(input);
  }

  @Post("add-trash")
  async addTrash(
    @Body() input: ActivityAddTrashInput,
  ): Promise<ActivityObject> {
    return this.activityService.addTrash(input);
  }

  @Post("add-path-point")
  async addPathPoint(
    @Body() input: ActivityAddPathPointInput,
  ): Promise<ActivityObject> {
    return this.activityService.addPathPoint(input);
  }

  @Put(":id")
  async updateActivity(
    @Param("id") id: string,
    @Body() input: ActivityUpdateInput,
  ): Promise<ActivityObject | null> {
    return this.activityService.update(id, input);
  }

  @Delete(":id")
  async deleteActivity(
    @Param("id") id: string,
  ): Promise<ActivityObject | null> {
    return this.activityService.delete(id);
  }

  @Get(":activityId/duration")
  async getCurrentDuration(
    @Param("activityId") activityId: string,
  ): Promise<number | null> {
    return this.activityService.getCurrentDuration(activityId);
  }
}
