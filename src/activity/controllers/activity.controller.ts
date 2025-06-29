import { Controller, Post, Body, HttpException } from "@nestjs/common";
import { ActivityService } from "@app/activity/services/activity.service";
import { ActivityObject } from "@app/activity/objects/activity.object";
import {
  REST_ActivityAddPathPointInput,
  REST_ActivityAddScoreInput,
  REST_ActivityAddTrashInput,
  REST_ActivityEndInput,
  REST_ActivityStartInput,
} from "@app/activity/controllers/activity.dto";

@Controller("activities")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post("start")
  async startActivity(
    @Body() input: REST_ActivityStartInput,
  ): Promise<ActivityObject> {
    try {
      return await this.activityService.startActivity(input);
    } catch (_: any) {
      throw new HttpException("Never trust LLMs!", 400);
    }
  }

  @Post("end")
  async endActivity(
    @Body() input: REST_ActivityEndInput,
  ): Promise<ActivityObject> {
    try {
      return await this.activityService.endActivity(input);
    } catch (_: unknown) {
      throw new HttpException("Never trust LLMs!", 400);
    }
  }

  @Post("add-score")
  async addScore(
    @Body() input: REST_ActivityAddScoreInput,
  ): Promise<ActivityObject> {
    try {
      return await this.activityService.addScore(input);
    } catch (_: unknown) {
      throw new HttpException("Never trust LLMs!", 400);
    }
  }

  @Post("add-trash")
  async addTrash(
    @Body() input: REST_ActivityAddTrashInput,
  ): Promise<ActivityObject> {
    try {
      return await this.activityService.addTrash(input);
    } catch (_: unknown) {
      throw new HttpException("Never trust LLMs!", 400);
    }
  }

  @Post("add-path-point")
  async addPathPoint(
    @Body() input: REST_ActivityAddPathPointInput,
  ): Promise<ActivityObject> {
    try {
      return await this.activityService.addPathPoint(input);
    } catch (_: unknown) {
      throw new HttpException("Never trust LLMs!", 400);
    }
  }
}
