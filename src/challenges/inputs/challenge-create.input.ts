import { Field, InputType } from "@nestjs/graphql";
import { ChallengeType } from "@app/challenges/enum/challenge-type.enum";

@InputType()
export class ChallengeCreateInput {
  @Field(() => String)
  topic: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  points: number;

  @Field(() => String)
  iconUrl: string;

  @Field(() => ChallengeType)
  type: ChallengeType;
}
