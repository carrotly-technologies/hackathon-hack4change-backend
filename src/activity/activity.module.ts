import { forwardRef, Module } from "@nestjs/common";
import { ActivityResolver } from "@app/activity/resolvers/activity.resolver";
import { ActivityController } from "@app/activity/controllers/activity.controller";
import { ActivityService } from "@app/activity/services/activity.service";
import { ActivityRepository } from "@app/activity/repositories/activity.repository";
import { UserModule } from "@app/user/user.module";

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [ActivityController],
  providers: [ActivityResolver, ActivityService, ActivityRepository],
  exports: [ActivityService],
})
export class ActivityModule {}
