import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { ChallengeCreateInput } from "@app/challenges/inputs/challenge-create.input";
import { ChallengeUpdateInput } from "@app/challenges/inputs/challenge-update.input";
import { ChallengeFindManyInput } from "@app/challenges/inputs/challenge-find-many.input";
import { ChallengeFindManySortInput } from "@app/challenges/inputs/challenge-find-many-sort.input";
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
}
