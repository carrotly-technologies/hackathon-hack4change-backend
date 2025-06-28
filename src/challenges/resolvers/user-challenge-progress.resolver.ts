import { ResolveField, Parent, Resolver } from "@nestjs/graphql";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { UserChallengeProgressObject } from "@app/challenges/objects/user-challenge-progress.object";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";

@Resolver(() => UserChallengeProgressObject)
export class UserChallengeProgressResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @ResolveField(() => ChallengeObject, { nullable: true })
  async challenge(
    @Parent() userChallengeProgress: UserChallengeProgressObject,
  ): Promise<ChallengeObject | null> {
    return this.challengeService.findById(userChallengeProgress.challengeId);
  }
}
