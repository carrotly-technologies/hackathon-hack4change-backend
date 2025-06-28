import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { LeaderboardService } from "../services/leaderboard.service";
import { UserObject } from "../../user/objects/user.object";

@Resolver(() => UserObject)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Query(() => [UserObject], {
    description: "Get top 10 users by points",
  })
  async leaderboard(
    @Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<UserObject[]> {
    return this.leaderboardService.getTopUsers(limit);
  }
}
