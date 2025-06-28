import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocalizationInput {
  @Field(() => String)
  name: string;

  @Field(() => [Number])
  coordinates: [number, number];
}