import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import {
  Challenge,
  ChallengeSchema,
} from "../challenges/schemas/challenge.schema";
import { Activity, ActivitySchema } from "../activity/schemas/activity.schema";
import { LeaderboardResolver } from "./resolvers/leaderboard.resolver";
import { LeaderboardService } from "./services/leaderboard.service";
import { LeaderboardRepository } from "./repositories/leaderboard.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  providers: [LeaderboardResolver, LeaderboardService, LeaderboardRepository],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
