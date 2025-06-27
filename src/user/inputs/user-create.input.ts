import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserCreateInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;
}
