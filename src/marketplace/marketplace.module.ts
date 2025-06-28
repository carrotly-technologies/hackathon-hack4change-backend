import { Module } from "@nestjs/common";
import { MarketplaceResolver } from "./resolvers/marketplace.resolver";
import { MarketplaceService } from "./services/marketplace.service";
import { MarketplaceRepository } from "./repositories/marketplace.repository";
import { UserModule } from "@app/user/user.module";

@Module({
  imports: [UserModule],
  providers: [MarketplaceResolver, MarketplaceService, MarketplaceRepository],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
