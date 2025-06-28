import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { UserChallengeProgressObject } from "@app/challenges/objects/user-challenge-progress.object";
import { ChallengeCreateInput } from "@app/challenges/inputs/challenge-create.input";
import { ChallengeUpdateInput } from "@app/challenges/inputs/challenge-update.input";
import { ChallengeFindManyInput } from "@app/challenges/inputs/challenge-find-many.input";
import { ChallengeFindManySortInput } from "@app/challenges/inputs/challenge-find-many-sort.input";
import { ChallengeStartInput } from "@app/challenges/inputs/challenge-start.input";
import { ChallengeUpdateProgressInput } from "@app/challenges/inputs/challenge-update-progress.input";
import { ChallengeProgressFindInput } from "@app/challenges/inputs/challenge-progress-find.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { ChallengePaginationResponse } from "@app/challenges/responses/challenge-pagination.response";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";
import { ChallengeInput } from "@app/challenges/inputs/challenge.input";

@Resolver(() => ChallengeObject)
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Query(() => ChallengeObject, { nullable: true })
  async challenge(
    @Args(INPUT_KEY) input: ChallengeInput,
  ): Promise<ChallengeObject | null> {
    return this.challengeService.findById(input.id);
  }

  @Query(() => ChallengePaginationResponse)
  async challenges(
    @Args(INPUT_KEY) input: ChallengeFindManyInput,
    @Args(INPUT_SORT) sort: ChallengeFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.challengeService.findAll(input, sort, pagination);
  }

  @Mutation(() => ChallengeObject)
  async challengeCreate(
    @Args(INPUT_KEY) input: ChallengeCreateInput,
  ): Promise<ChallengeObject> {
    return this.challengeService.create(input);
  }

  @Mutation(() => ChallengeObject, { nullable: true })
  async challengeUpdate(
    @Args(INPUT_KEY) input: ChallengeUpdateInput,
  ): Promise<ChallengeObject | null> {
    return this.challengeService.update(input);
  }

  @Mutation(() => ChallengeObject, { nullable: true })
  async challengeDelete(
    @Args(INPUT_KEY) input: ChallengeInput,
  ): Promise<ChallengeObject | null> {
    return this.challengeService.delete(input.id);
  }

  @Mutation(() => UserChallengeProgressObject)
  async challengeStart(
    @Args(INPUT_KEY) input: ChallengeStartInput,
  ): Promise<UserChallengeProgressObject> {
    return this.challengeService.startChallenge(input);
  }

  @Mutation(() => UserChallengeProgressObject)
  async challengeUpdateProgress(
    @Args(INPUT_KEY) input: ChallengeUpdateProgressInput,
  ): Promise<UserChallengeProgressObject> {
    return this.challengeService.updateProgress(input);
  }

  @Query(() => [UserChallengeProgressObject])
  async userChallengeProgress(
    @Args(INPUT_KEY) input: ChallengeProgressFindInput,
  ): Promise<UserChallengeProgressObject[]> {
    if (input.userId && input.challengeId) {
      const progress = await this.challengeService.getUserChallengeProgress(
        input.userId,
        input.challengeId,
      );
      return progress ? [progress] : [];
    }
    if (input.userId) {
      return this.challengeService.getUserProgress(input.userId);
    }
    if (input.challengeId) {
      return this.challengeService.getChallengeProgress(input.challengeId);
    }
    return [];
  }
}
