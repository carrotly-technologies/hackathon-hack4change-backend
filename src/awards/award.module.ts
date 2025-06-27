import { Module } from "@nestjs/common";
import { AwardResolver } from "@app/awards/resolvers/award.resolver";
import { AwardService } from "@app/awards/services/award.service";
import { AwardRepository } from "@app/awards/repositories/award.repository";

@Module({
  providers: [AwardResolver, AwardService, AwardRepository],
  exports: [AwardService],
})
export class AwardModule {} 