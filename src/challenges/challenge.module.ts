import { forwardRef, Module } from "@nestjs/common";
import { ChallengeResolver } from "@app/challenges/resolvers/challenge.resolver";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { ChallengeRepository } from "@app/challenges/repositories/challenge.repository";
import { UserChallengeProgressRepository } from "@app/challenges/repositories/user-challenge-progress.repository";
import { UserModule } from "@app/user/user.module";

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [
    ChallengeResolver,
    ChallengeService,
    ChallengeRepository,
    UserChallengeProgressRepository,
  ],
  exports: [ChallengeService],
})
export class ChallengeModule {}
