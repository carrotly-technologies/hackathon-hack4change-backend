import { Injectable } from "@nestjs/common";
import { ChallengeRepository } from "@app/challenges/repositories/challenge.repository";
import { UserChallengeProgressRepository } from "@app/challenges/repositories/user-challenge-progress.repository";
import { UserService } from "@app/user/services/user.service";
import { ChallengeCreateInput } from "@app/challenges/inputs/challenge-create.input";
import { ChallengeUpdateInput } from "@app/challenges/inputs/challenge-update.input";
import { ChallengeFindManyInput } from "@app/challenges/inputs/challenge-find-many.input";
import { ChallengeFindManySortInput } from "@app/challenges/inputs/challenge-find-many-sort.input";
import { ChallengeStartInput } from "@app/challenges/inputs/challenge-start.input";
import { ChallengeUpdateProgressInput } from "@app/challenges/inputs/challenge-update-progress.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { UserChallengeProgressObject } from "@app/challenges/objects/user-challenge-progress.object";
import { ChallengePaginationResponse } from "@app/challenges/responses/challenge-pagination.response";
import { ChallengeStatus } from "@app/challenges/schemas/user-challenge-progress.schema";

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly userChallengeProgressRepository: UserChallengeProgressRepository,
    private readonly userService: UserService,
  ) {}

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

  async startChallenge(
    input: ChallengeStartInput,
  ): Promise<UserChallengeProgressObject> {
    // Check if challenge exists
    const challenge = await this.findById(input.challengeId);
    if (!challenge) {
      throw new Error("Challenge not found");
    }

    // Check if user already has progress for this challenge
    const existingProgress =
      await this.userChallengeProgressRepository.findByUserAndChallenge(
        input.userId,
        input.challengeId,
      );
    if (existingProgress) {
      throw new Error("User has already started this challenge");
    }

    // Create new progress record
    const progress = await this.userChallengeProgressRepository.create(
      input.userId,
      input.challengeId,
    );
    return new UserChallengeProgressObject(progress);
  }

  async updateProgress(
    input: ChallengeUpdateProgressInput,
  ): Promise<UserChallengeProgressObject> {
    // Validate progress value
    if (input.progress < 0 || input.progress > 100) {
      throw new Error("Progress must be between 0 and 100");
    }

    // Check if progress record exists
    const existingProgress =
      await this.userChallengeProgressRepository.findByUserAndChallenge(
        input.userId,
        input.challengeId,
      );
    if (!existingProgress) {
      throw new Error("User has not started this challenge");
    }

    // Check if challenge is already completed
    if (existingProgress.status === ChallengeStatus.COMPLETED) {
      throw new Error("Challenge is already completed");
    }

    // Update progress
    const updatedProgress =
      await this.userChallengeProgressRepository.updateProgress(input);
    if (!updatedProgress) {
      throw new Error("Failed to update progress");
    }

    // If challenge is now completed, add coins to user
    if (updatedProgress.status === ChallengeStatus.COMPLETED) {
      const challenge = await this.findById(input.challengeId);
      if (challenge && challenge.coin > 0) {
        await this.userService.addCoinsToUser(input.userId, challenge.coin);
      }
    }

    return new UserChallengeProgressObject(updatedProgress);
  }

  async getUserProgress(
    userId: string,
  ): Promise<UserChallengeProgressObject[]> {
    const progressRecords =
      await this.userChallengeProgressRepository.findByUser(userId);
    return progressRecords.map(
      (record) => new UserChallengeProgressObject(record),
    );
  }

  async getChallengeProgress(
    challengeId: string,
  ): Promise<UserChallengeProgressObject[]> {
    const progressRecords =
      await this.userChallengeProgressRepository.findByChallenge(challengeId);
    return progressRecords.map(
      (record) => new UserChallengeProgressObject(record),
    );
  }

  async getUserChallengeProgress(
    userId: string,
    challengeId: string,
  ): Promise<UserChallengeProgressObject | null> {
    const progress =
      await this.userChallengeProgressRepository.findByUserAndChallenge(
        userId,
        challengeId,
      );
    return progress ? new UserChallengeProgressObject(progress) : null;
  }
}
