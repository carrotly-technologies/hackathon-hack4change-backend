import { Injectable } from "@nestjs/common";
import { LeaderboardRepository } from "../repositories/leaderboard.repository";
import { LeaderboardEntryObject } from "../objects/leaderboard-entry.object";

@Injectable()
export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async getTopUsers(limit = 10): Promise<LeaderboardEntryObject[]> {
    const results = await this.leaderboardRepository.getTopUsers(limit);
    return results.map(
      (result, index) =>
        new LeaderboardEntryObject({
          ...result,
          rank: index + 1,
        }),
    );
  }
}
