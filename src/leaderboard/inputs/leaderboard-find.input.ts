import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class LeaderboardFindInput {
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
