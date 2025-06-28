import { Injectable } from "@nestjs/common";
import { ActivityRepository } from "@app/activity/repositories/activity.repository";
import { ActivityCreateInput } from "@app/activity/inputs/activity-create.input";
import { ActivityUpdateInput } from "@app/activity/inputs/activity-update.input";
import { ActivityFindManyInput } from "@app/activity/inputs/activity-find-many.input";
import { ActivityFindManySortInput } from "@app/activity/inputs/activity-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { ActivityObject } from "@app/activity/objects/activity.object";
import { ActivityPaginationResponse } from "@app/activity/responses/activity-pagination.response";

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

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
}
