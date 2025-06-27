import { Field, InputType } from "@nestjs/graphql";

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
}
