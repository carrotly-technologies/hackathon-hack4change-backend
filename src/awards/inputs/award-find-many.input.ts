import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AwardFindManyInput {
  @Field(() => String, { nullable: true })
  iconUrl?: string;
} 