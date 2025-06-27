import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserFindManyInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => Number, { nullable: true })
  points?: number;
}
