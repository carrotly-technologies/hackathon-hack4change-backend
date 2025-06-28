import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { User, UserDocument } from "../../user/schemas/user.schema";
import {
  Activity,
  ActivityDocument,
} from "../../activity/schemas/activity.schema";
import {
  Challenge,
  ChallengeDocument,
} from "../../challenges/schemas/challenge.schema";
import { LeaderboardFindInput } from "../inputs/leaderboard-find.input";

interface ActivityPointsResult {
  _id: string;
  activityPoints: number;
}

interface ChallengePointsResult {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  challengePoints: number;
}

interface DateFilter {
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
  updatedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

@Injectable()
export class LeaderboardRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<ChallengeDocument>,
  ) {}

  async getTopUsers(input: LeaderboardFindInput): Promise<any[]> {
    const { limit = 10, startDate, endDate } = input;

    // Build date filter for activities
    const activityDateFilter: DateFilter = {};
    if (startDate || endDate) {
      activityDateFilter.createdAt = {};
      if (startDate) {
        activityDateFilter.createdAt.$gte = startDate;
      }
      if (endDate) {
        activityDateFilter.createdAt.$lte = endDate;
      }
    }

    // Build date filter for challenges (using user's challenge completion date)
    const challengeDateFilter: DateFilter = {};
    if (startDate || endDate) {
      challengeDateFilter.updatedAt = {};
      if (startDate) {
        challengeDateFilter.updatedAt.$gte = startDate;
      }
      if (endDate) {
        challengeDateFilter.updatedAt.$lte = endDate;
      }
    }

    // First, get all users with their activity points within date range
    const activityPipeline: PipelineStage[] = [];
    if (Object.keys(activityDateFilter).length > 0) {
      activityPipeline.push({ $match: activityDateFilter });
    }
    activityPipeline.push({
      $group: {
        _id: "$userId",
        activityPoints: { $sum: "$points" },
      },
    });

    const usersWithActivityPoints =
      await this.activityModel.aggregate<ActivityPointsResult>(
        activityPipeline,
      );

    // Create a map of userId to activity points
    const activityPointsMap = new Map();
    usersWithActivityPoints.forEach((item) => {
      activityPointsMap.set(item._id.toString(), item.activityPoints);
    });

    // Get all users with their challenge points within date range
    const challengePipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "challenges",
          localField: "challengeIds",
          foreignField: "_id",
          as: "challenges",
        },
      },
    ];

    if (Object.keys(challengeDateFilter).length > 0) {
      challengePipeline.push({ $match: challengeDateFilter });
    }

    challengePipeline.push({
      $project: {
        _id: 1,
        email: 1,
        firstname: 1,
        lastname: 1,
        avatarUrl: 1,
        challengePoints: {
          $sum: "$challenges.points",
        },
      },
    });

    const usersWithChallengePoints =
      await this.userModel.aggregate<ChallengePointsResult>(challengePipeline);

    // Create a map of userId to challenge points
    const challengePointsMap = new Map();
    usersWithChallengePoints.forEach((item) => {
      challengePointsMap.set(item._id.toString(), item.challengePoints ?? 0);
    });

    // Get all users and calculate their total points
    const allUsers = await this.userModel.find().lean();

    const usersWithTotalPoints = allUsers.map((user) => {
      const userId = user._id.toString();
      const activityPoints = activityPointsMap.get(userId) ?? 0;
      const challengePoints = challengePointsMap.get(userId) ?? 0;
      const totalPoints = activityPoints + challengePoints;

      return {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatarUrl: user.avatarUrl,
        totalPoints,
        activityPoints,
        challengePoints,
      };
    });

    // Sort by total points descending and return top users
    return usersWithTotalPoints
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
  }
}
