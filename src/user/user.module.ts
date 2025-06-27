import { Module } from "@nestjs/common";
import { UserResolver } from "@app/user/resolvers/user.resolver";
import { UserObjectResolver } from "@app/user/resolvers/user-object.resolver";
import { UserService } from "@app/user/services/user.service";
import { UserRepository } from "@app/user/repositories/user.repository";
import { AwardModule } from "@app/awards/award.module";
import { ChallengeModule } from "@app/challenges/challenge.module";

@Module({
  imports: [AwardModule, ChallengeModule],
  providers: [UserResolver, UserObjectResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
