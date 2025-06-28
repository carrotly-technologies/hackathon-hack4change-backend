import { Module } from "@nestjs/common";
import { ActivityResolver } from "@app/activity/resolvers/activity.resolver";
import { ActivityService } from "@app/activity/services/activity.service";
import { ActivityRepository } from "@app/activity/repositories/activity.repository";

@Module({
  providers: [ActivityResolver, ActivityService, ActivityRepository],
  exports: [ActivityService],
})
export class ActivityModule {}
