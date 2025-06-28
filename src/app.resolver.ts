import { Query, Resolver } from "@nestjs/graphql";

import { Public } from "./common/decorators/public.decorator";
import { Errors } from "./utils/registerEnums";

@Resolver()
export class AppResolver {
  @Public()
  @Query(() => [Errors], {
    name: "errors",
  })
  getErrors() {
    return Object.values(Errors);
  }
}
