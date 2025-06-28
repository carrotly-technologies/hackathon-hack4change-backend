import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  UserChallengeProgressDocument,
  ChallengeStatus,
} from "@app/challenges/schemas/user-challenge-progress.schema";
import { ChallengeUpdateProgressInput } from "@app/challenges/inputs/challenge-update-progress.input";

@Injectable()
export class UserChallengeProgressRepository {
  constructor(
    @InjectModel("UserChallengeProgress")
    private readonly userChallengeProgressModel: Model<UserChallengeProgressDocument>,
  ) {}

  async create(
    userId: string,
    challengeId: string,
  ): Promise<UserChallengeProgressDocument> {
    const progress = new this.userChallengeProgressModel({
      userId: new Types.ObjectId(userId),
      challengeId: new Types.ObjectId(challengeId),
      progress: 0,
      status: ChallengeStatus.IN_PROGRESS,
      startedAt: new Date(),
    });
    return progress.save();
  }

  async findById(id: string): Promise<UserChallengeProgressDocument | null> {
    return this.userChallengeProgressModel.findById(id).exec();
  }

  async findByUserAndChallenge(
    userId: string,
    challengeId: string,
  ): Promise<UserChallengeProgressDocument | null> {
    return this.userChallengeProgressModel
      .findOne({
        userId: new Types.ObjectId(userId),
        challengeId: new Types.ObjectId(challengeId),
      })
      .exec();
  }

  async findByUser(userId: string): Promise<UserChallengeProgressDocument[]> {
    return this.userChallengeProgressModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .exec();
  }

  async findByChallenge(
    challengeId: string,
  ): Promise<UserChallengeProgressDocument[]> {
    return this.userChallengeProgressModel
      .find({
        challengeId: new Types.ObjectId(challengeId),
      })
      .exec();
  }

  async updateProgress(
    input: ChallengeUpdateProgressInput,
  ): Promise<UserChallengeProgressDocument | null> {
    const { userId, challengeId, progress } = input;

    const updateData: Partial<UserChallengeProgressDocument> = { progress };

    // If progress reaches 100, mark as completed
    if (progress >= 100) {
      updateData.status = ChallengeStatus.COMPLETED;
      updateData.completedAt = new Date();
    }

    return this.userChallengeProgressModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          challengeId: new Types.ObjectId(challengeId),
        },
        updateData,
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<UserChallengeProgressDocument | null> {
    return this.userChallengeProgressModel.findByIdAndDelete(id).exec();
  }

  async deleteByUserAndChallenge(
    userId: string,
    challengeId: string,
  ): Promise<UserChallengeProgressDocument | null> {
    return this.userChallengeProgressModel
      .findOneAndDelete({
        userId: new Types.ObjectId(userId),
        challengeId: new Types.ObjectId(challengeId),
      })
      .exec();
  }
}
