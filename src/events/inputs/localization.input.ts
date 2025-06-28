import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocalizationInput {
  @Field(() => Number, { description: 'Your current latitude' })
  latitude: number;

  @Field(() => Number, { description: 'Your current longitude' })
  longitude: number;

  @Field(() => Number, { description: 'Distance in kilometers' })
  distance: number;
}