import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { UserRepository } from "@app/user/repositories/user.repository";
import { AwardService } from "@app/awards/services/award.service";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { UserCreateInput } from "@app/user/inputs/user-create.input";
import { UserUpdateInput } from "@app/user/inputs/user-update.input";
import { UserFindManyInput } from "@app/user/inputs/user-find-many.input";
import { UserFindManySortInput } from "@app/user/inputs/user-find-many-sort.input";
import { UserAddAwardInput } from "@app/user/inputs/user-add-award.input";
import { UserAddChallengeInput } from "@app/user/inputs/user-add-challenge.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { UserObject } from "@app/user/objects/user.object";
import { UserPaginationResponse } from "@app/user/responses/user-pagination.response";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly awardService: AwardService,
    private readonly challengeService: ChallengeService,
  ) {}

  async create(input: UserCreateInput): Promise<UserObject> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Validate award IDs if provided
    if (input.awardIds && input.awardIds.length > 0) {
      await this.validateAwardIds(input.awardIds);
    }

    // Validate challenge IDs if provided
    if (input.challengeIds && input.challengeIds.length > 0) {
      await this.validateChallengeIds(input.challengeIds);
    }

    // Convert string IDs to ObjectIds
    const userData = {
      ...input,
      awardIds: input.awardIds
        ? input.awardIds.map((id) => new Types.ObjectId(id))
        : [],
      challengeIds: input.challengeIds
        ? input.challengeIds.map((id) => new Types.ObjectId(id))
        : [],
    };

    const user = await this.userRepository.create(userData);
    return new UserObject(user);
  }

  async findById(id: string): Promise<UserObject | null> {
    const user = await this.userRepository.findById(id);
    return user ? new UserObject(user) : null;
  }

  async findByEmail(email: string): Promise<UserObject | null> {
    const user = await this.userRepository.findByEmail(email);
    return user ? new UserObject(user) : null;
  }

  async findAll(
    input: UserFindManyInput,
    sort: UserFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof UserPaginationResponse>> {
    return this.userRepository.findAll(input, sort, pagination);
  }

  async update(input: UserUpdateInput): Promise<UserObject | null> {
    if (input.email) {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser && existingUser._id.toString() !== input.id) {
        throw new Error("User with this email already exists");
      }
    }

    // Validate award IDs if provided
    if (input.awardIds && input.awardIds.length > 0) {
      await this.validateAwardIds(input.awardIds);
    }

    // Validate challenge IDs if provided
    if (input.challengeIds && input.challengeIds.length > 0) {
      await this.validateChallengeIds(input.challengeIds);
    }

    // Convert string IDs to ObjectIds
    const updateData = {
      ...input,
      awardIds: input.awardIds
        ? input.awardIds.map((id) => new Types.ObjectId(id))
        : undefined,
      challengeIds: input.challengeIds
        ? input.challengeIds.map((id) => new Types.ObjectId(id))
        : undefined,
    };

    const user = await this.userRepository.update(input.id, updateData);
    return user ? new UserObject(user) : null;
  }

  async delete(id: string): Promise<UserObject | null> {
    const user = await this.userRepository.delete(id);
    return user ? new UserObject(user) : null;
  }

  async addAwardToUser(input: UserAddAwardInput): Promise<UserObject> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const award = await this.awardService.findById(input.awardId);
    if (!award) {
      throw new Error("Award not found");
    }

    // Check if user already has this award
    if (user.awardIds.some((id) => id.toString() === input.awardId)) {
      throw new Error("User already has this award");
    }

    // Add award to user and update coin balance
    const updatedUser = await this.userRepository.addAwardToUser(
      input.userId,
      new Types.ObjectId(input.awardId),
      award.coin,
    );

    if (!updatedUser) {
      throw new Error("Failed to add award to user");
    }

    return new UserObject(updatedUser);
  }

  async addChallengeToUser(input: UserAddChallengeInput): Promise<UserObject> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const challenge = await this.challengeService.findById(input.challengeId);
    if (!challenge) {
      throw new Error("Challenge not found");
    }

    // Check if user already has this challenge
    if (user.challengeIds.some((id) => id.toString() === input.challengeId)) {
      throw new Error("User already has this challenge");
    }

    // Add challenge to user and update coin balance
    const updatedUser = await this.userRepository.addChallengeToUser(
      input.userId,
      new Types.ObjectId(input.challengeId),
      challenge.coin,
    );

    if (!updatedUser) {
      throw new Error("Failed to add challenge to user");
    }

    return new UserObject(updatedUser);
  }

  private async validateAwardIds(awardIds: string[]): Promise<void> {
    for (const awardId of awardIds) {
      const award = await this.awardService.findById(awardId);
      if (!award) {
        throw new Error(`Award with ID ${awardId} does not exist`);
      }
    }
  }

  private async validateChallengeIds(challengeIds: string[]): Promise<void> {
    for (const challengeId of challengeIds) {
      const challenge = await this.challengeService.findById(challengeId);
      if (!challenge) {
        throw new Error(`Challenge with ID ${challengeId} does not exist`);
      }
    }
  }
}
