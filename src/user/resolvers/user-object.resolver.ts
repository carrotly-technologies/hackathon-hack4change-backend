import { ResolveField, Resolver, Parent } from "@nestjs/graphql";
import { UserObject } from "@app/user/objects/user.object";
import { AwardObject } from "@app/awards/objects/award.object";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { UserChallengeProgressObject } from "@app/challenges/objects/user-challenge-progress.object";
import { AwardService } from "@app/awards/services/award.service";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { ActivityService } from "@app/activity/services/activity.service";

@Resolver(() => UserObject)
export class UserObjectResolver {
  constructor(
    private readonly awardService: AwardService,
    private readonly challengeService: ChallengeService,
    private readonly activityService: ActivityService,
  ) {}

  @ResolveField(() => [AwardObject])
  async awards(@Parent() user: UserObject): Promise<AwardObject[]> {
    if (!user.awardIds || user.awardIds.length === 0) {
      return [];
    }

    const awards: AwardObject[] = [];

    for (const awardId of user.awardIds) {
      const award = await this.awardService.findById(awardId);
      if (award) {
        awards.push(award);
      }
    }

    return awards;
  }

  @ResolveField(() => [ChallengeObject])
  async challenges(@Parent() user: UserObject): Promise<ChallengeObject[]> {
    // Get user's challenge progress
    const userProgress = await this.challengeService.getUserProgress(user.id);

    if (!userProgress || userProgress.length === 0) {
      return [];
    }

    const challenges: ChallengeObject[] = [];

    // Fetch challenge details for each progress record
    for (const progress of userProgress) {
      const challenge = await this.challengeService.findById(
        progress.challengeId,
      );
      if (challenge) {
        challenges.push(challenge);
      }
    }

    return challenges;
  }

  @ResolveField(() => [UserChallengeProgressObject])
  async challengeProgress(
    @Parent() user: UserObject,
  ): Promise<UserChallengeProgressObject[]> {
    return this.challengeService.getUserProgress(user.id);
  }

  @ResolveField(() => Number)
  async points(@Parent() user: UserObject): Promise<number> {
    const userActivity = await this.activityService.findByUserId(user.id);
    if (!userActivity) {
      return 0;
    }

    return userActivity.reduce((acc, activity) => acc + activity.points, 0);
  }
}
