import { ResolveField, Resolver, Parent } from "@nestjs/graphql";
import { UserObject } from "@app/user/objects/user.object";
import { AwardObject } from "@app/awards/objects/award.object";
import { AwardService } from "@app/awards/services/award.service";

@Resolver(() => UserObject)
export class UserObjectResolver {
  constructor(private readonly awardService: AwardService) {}

  @ResolveField(() => [AwardObject])
  async awards(@Parent() user: UserObject): Promise<AwardObject[]> {
    if (!user.awardIds || user.awardIds.length === 0) {
      return [];
    }

    const awards: AwardObject[] = [];

    for (const awardId of user.awardIds) {
      const award = await this.awardService.findById(awardId);
      if (award) {
        awards.push(award);
      }
    }

    return awards;
  }
}
