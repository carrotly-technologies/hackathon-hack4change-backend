import { Injectable } from "@nestjs/common";
import { ChallengeRepository } from "@app/challenges/repositories/challenge.repository";
import { ChallengeCreateInput } from "@app/challenges/inputs/challenge-create.input";
import { ChallengeUpdateInput } from "@app/challenges/inputs/challenge-update.input";
import { ChallengeFindManyInput } from "@app/challenges/inputs/challenge-find-many.input";
import { ChallengeFindManySortInput } from "@app/challenges/inputs/challenge-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { ChallengePaginationResponse } from "@app/challenges/responses/challenge-pagination.response";

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async create(input: ChallengeCreateInput): Promise<ChallengeObject> {
    const challenge = await this.challengeRepository.create(input);
    return new ChallengeObject(challenge);
  }

  async findById(id: string): Promise<ChallengeObject | null> {
    const challenge = await this.challengeRepository.findById(id);
    return challenge ? new ChallengeObject(challenge) : null;
  }

  async findAll(
    input: ChallengeFindManyInput,
    sort: ChallengeFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof ChallengePaginationResponse>> {
    return this.challengeRepository.findAll(input, sort, pagination);
  }

  async update(input: ChallengeUpdateInput): Promise<ChallengeObject | null> {
    const challenge = await this.challengeRepository.update(input.id, input);
    return challenge ? new ChallengeObject(challenge) : null;
  }

  async delete(id: string): Promise<ChallengeObject | null> {
    const challenge = await this.challengeRepository.delete(id);
    return challenge ? new ChallengeObject(challenge) : null;
  }
}
