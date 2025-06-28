import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { LeaderboardService } from "../services/leaderboard.service";
import { LeaderboardEntryObject } from "../objects/leaderboard-entry.object";

@Resolver(() => LeaderboardEntryObject)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Query(() => [LeaderboardEntryObject], {
    description: "Get top users by total points (activities + challenges)",
  })
  async leaderboard(
    @Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<LeaderboardEntryObject[]> {
    return this.leaderboardService.getTopUsers(limit);
  }
}
