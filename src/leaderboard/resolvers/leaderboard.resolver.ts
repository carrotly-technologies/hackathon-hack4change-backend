import { Args, Query, Resolver } from "@nestjs/graphql";
import { LeaderboardService } from "../services/leaderboard.service";
import { LeaderboardEntryObject } from "../objects/leaderboard-entry.object";
import { LeaderboardFindInput } from "../inputs/leaderboard-find.input";
import { INPUT_KEY } from "@app/common/common.constraints";

@Resolver(() => LeaderboardEntryObject)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Query(() => [LeaderboardEntryObject], {
    description:
      "Get top users by total points (activities + challenges) with optional date filtering",
  })
  async leaderboard(
    @Args(INPUT_KEY) input: LeaderboardFindInput,
  ): Promise<LeaderboardEntryObject[]> {
    return this.leaderboardService.getTopUsers(input);
  }
}
