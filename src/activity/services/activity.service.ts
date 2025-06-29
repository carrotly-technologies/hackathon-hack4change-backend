import { Injectable } from "@nestjs/common";
import { ActivityRepository } from "@app/activity/repositories/activity.repository";
import { ActivityCreateInput } from "@app/activity/inputs/activity-create.input";
import { ActivityUpdateInput } from "@app/activity/inputs/activity-update.input";
import { ActivityFindManyInput } from "@app/activity/inputs/activity-find-many.input";
import { ActivityFindManySortInput } from "@app/activity/inputs/activity-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import {
  ActivityObject,
  PathPointObject,
} from "@app/activity/objects/activity.object";
import { ActivityPaginationResponse } from "@app/activity/responses/activity-pagination.response";
import { ActivityStartInput } from "@app/activity/inputs/activity-start.input";
import { ActivityEndInput } from "@app/activity/inputs/activity-end.input";
import { ActivityAddScoreInput } from "@app/activity/inputs/activity-add-score.input";
import { ActivityAddTrashInput } from "@app/activity/inputs/activity-add-trash.input";
import { ActivityAddPathPointInput } from "@app/activity/inputs/activity-add-point.input";
import { ActivityAlreadyStartedError } from "@app/activity/errors/activity-already-started.error";
import { ActivityNotActiveError } from "@app/activity/errors/activity-not-active.error";
import { ActivityNotFoundError } from "@app/activity/errors/activity-not-found.error";

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) { }

  async create(input: ActivityCreateInput): Promise<ActivityObject> {
    const activity = await this.activityRepository.create(input);
    return new ActivityObject(activity);
  }

  async findById(id: string): Promise<ActivityObject | null> {
    const activity = await this.activityRepository.findById(id);
    return activity ? new ActivityObject(activity) : null;
  }

  async findByUserId(userId: string): Promise<ActivityObject[] | null> {
    const activity = await this.activityRepository.findByUserId(userId);
    return activity
      ? activity.map((activity) => new ActivityObject(activity))
      : null;
  }

  async findActiveByUserId(userId: string): Promise<ActivityObject | null> {
    const activity = await this.activityRepository.findActiveByUserId(userId);
    return activity ? new ActivityObject(activity) : null;
  }

  async startActivity(input: ActivityStartInput): Promise<ActivityObject> {
    const existingActivity = await this.activityRepository.findActiveByUserId(
      input.userId,
    );
    if (existingActivity) {
      throw new ActivityAlreadyStartedError();
    }

    const activity = await this.activityRepository.startActivity(input);
    return new ActivityObject(activity);
  }

  async endActivity(input: ActivityEndInput): Promise<ActivityObject> {
    const activity = await this.activityRepository.findById(input.activityId);

    if (!activity) {
      throw new ActivityNotFoundError();
    }

    if (!activity.isActive) {
      throw new ActivityNotActiveError();
    }

    const updatedActivity = await this.activityRepository.endActivity(
      input.activityId,
      {
        distance: input.distance,
        imageUrls: input.imageUrls,
      },
    );


    if (!updatedActivity) {
      throw new ActivityNotFoundError();
    }

    return new ActivityObject(updatedActivity);
  }

  async addScore(input: ActivityAddScoreInput): Promise<ActivityObject> {
    const activity = await this.activityRepository.findById(input.activityId);
    if (!activity) {
      throw new ActivityNotFoundError();
    }
    if (!activity.isActive) {
      throw new ActivityNotActiveError();
    }

    const updatedActivity = await this.activityRepository.addPoints(
      input.activityId,
      input.points,
    );

    if (!updatedActivity) {
      throw new ActivityNotFoundError();
    }

    return new ActivityObject(updatedActivity);
  }

  async addTrash(input: ActivityAddTrashInput): Promise<ActivityObject> {
    const activity = await this.activityRepository.findById(input.activityId);
    if (!activity) {
      throw new ActivityNotFoundError();
    }
    if (!activity.isActive) {
      throw new ActivityNotActiveError();
    }

    const updatedActivity = await this.activityRepository.addTrash(
      input.activityId,
      input.lat,
      input.lon,
    );

    if (!updatedActivity) {
      throw new ActivityNotFoundError();
    }

    return new ActivityObject(updatedActivity);
  }

  async addPathPoint(
    input: ActivityAddPathPointInput,
  ): Promise<ActivityObject> {
    const activity = await this.activityRepository.findById(input.activityId);
    if (!activity) {
      throw new ActivityNotFoundError();
    }
    if (!activity.isActive) {
      throw new ActivityNotActiveError();
    }

    const updatedActivity = await this.activityRepository.addPathPoint(
      input.activityId,
      input.lat,
      input.lon,
    );

    if (!updatedActivity) {
      throw new ActivityNotFoundError();
    }

    return new ActivityObject(updatedActivity);
  }

  async findMany(
    filter: ActivityFindManyInput,
    sort: ActivityFindManySortInput,
    pagination: PaginationInput,
  ): Promise<ActivityPaginationResponse> {
    const result = await this.activityRepository.findMany(
      filter,
      sort,
      pagination,
    );

    const response = new ActivityPaginationResponse();
    response.data = result.data.map((activity) => new ActivityObject(activity));
    response.metadata = result.metadata;

    return response;
  }

  async update(
    id: string,
    input: ActivityUpdateInput,
  ): Promise<ActivityObject | null> {
    const activity = await this.activityRepository.update(id, input);
    return activity ? new ActivityObject(activity) : null;
  }

  async delete(id: string): Promise<ActivityObject | null> {
    const activity = await this.activityRepository.delete(id);
    return activity ? new ActivityObject(activity) : null;
  }

  async getCurrentDuration(activityId: string): Promise<number | null> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new ActivityNotFoundError();
    }
    if (!activity.isActive) {
      throw new ActivityNotActiveError();
    }

    return this.activityRepository.getCurrentDuration(activityId);
  }

  async thrashMap(): Promise<PathPointObject[]> {
    return await this.activityRepository.thrashMap();
  }
}
