import { ResolveField, Resolver, Parent } from "@nestjs/graphql";
import { UserObject } from "@app/user/objects/user.object";
import { AwardObject } from "@app/awards/objects/award.object";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
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
    if (!user.challengeIds || user.challengeIds.length === 0) {
      return [];
    }

    const challenges: ChallengeObject[] = [];

    for (const challengeId of user.challengeIds) {
      const challenge = await this.challengeService.findById(challengeId);
      if (challenge) {
        challenges.push(challenge);
      }
    }

    return challenges;
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
