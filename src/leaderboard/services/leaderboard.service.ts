import { Injectable } from "@nestjs/common";
import { LeaderboardRepository } from "../repositories/leaderboard.repository";
import { LeaderboardEntryObject } from "../objects/leaderboard-entry.object";
import { LeaderboardFindInput } from "../inputs/leaderboard-find.input";

@Injectable()
export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardRepository) {}

  async getTopUsers(
    input: LeaderboardFindInput,
  ): Promise<LeaderboardEntryObject[]> {
    const results = await this.leaderboardRepository.getTopUsers(input);
    return results.map(
      (result, index) =>
        new LeaderboardEntryObject({
          ...result,
          rank: index + 1,
        }),
    );
  }
}
