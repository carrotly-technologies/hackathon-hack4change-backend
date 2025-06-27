import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AwardCreateInput {
  @Field(() => String)
  iconUrl: string;
} 