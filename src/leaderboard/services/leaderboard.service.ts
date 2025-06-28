import { Injectable } from "@nestjs/common";
import { LeaderboardRepository } from "../repositories/leaderboard.repository";
import { UserObject } from "../../user/objects/user.object";

@Injectable()
export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async getTopUsers(limit = 10): Promise<UserObject[]> {
    const results = await this.leaderboardRepository.getTopUsers(limit);
    return results.map((result) => new UserObject(result));
  }
}
