import { PaginateResult } from "@app/common/responses/pagination.response";
import { UserObject } from "@app/user/objects/user.object";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserPaginationResponse extends PaginateResult(UserObject) {}
