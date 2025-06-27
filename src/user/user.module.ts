import { Module } from "@nestjs/common";
import { UserResolver } from "@app/user/resolvers/user.resolver";
import { UserService } from "@app/user/services/user.service";
import { UserRepository } from "@app/user/repositories/user.repository";

@Module({
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
