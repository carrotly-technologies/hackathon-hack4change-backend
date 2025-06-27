import { PaginateResult } from "@app/common/responses/pagination.response";
import { ChallengeObject } from "@app/challenges/objects/challenge.object";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ChallengePaginationResponse extends PaginateResult(
  ChallengeObject,
) {}
