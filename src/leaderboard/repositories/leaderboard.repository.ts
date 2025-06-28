import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../user/schemas/user.schema";
import {
  Activity,
  ActivityDocument,
} from "../../activity/schemas/activity.schema";

@Injectable()
export class LeaderboardRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<any>,
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async getTopUsers(limit = 10): Promise<any[]> {
    // Aggregate activities to get top users by total points
    const topUsers = await this.activityModel.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPoints: { $sum: "$points" },
        },
      },
      { $sort: { totalPoints: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $replaceRoot: { newRoot: "$user" },
      },
    ]);
    return topUsers;
  }
}
