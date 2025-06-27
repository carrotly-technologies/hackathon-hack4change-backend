import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Success {
  @Field(() => Boolean, { defaultValue: true })
  success: boolean;
}
