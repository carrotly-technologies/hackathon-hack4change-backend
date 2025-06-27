import { Module } from "@nestjs/common";
import { ChallengeResolver } from "@app/challenges/resolvers/challenge.resolver";
import { ChallengeService } from "@app/challenges/services/challenge.service";
import { ChallengeRepository } from "@app/challenges/repositories/challenge.repository";

@Module({
  providers: [ChallengeResolver, ChallengeService, ChallengeRepository],
  exports: [ChallengeService],
})
export class ChallengeModule {}
