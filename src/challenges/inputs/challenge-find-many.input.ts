import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChallengeFindManyInput {
  @Field(() => String, { nullable: true })
  topic?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Number, { nullable: true })
  points?: number;
}
