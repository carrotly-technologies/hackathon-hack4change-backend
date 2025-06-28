import { Field, InputType } from '@nestjs/graphql';
import { EventType } from '../enums/event-type.enum';
import { LocalizationInput } from './localization.input';

@InputType()
export class EventFindManyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  place?: string;

  @Field(() => LocalizationInput, { nullable: true })
  localization?: LocalizationInput;

  @Field(() => Date, { nullable: true })
  time?: Date;

  @Field(() => [EventType], { nullable: true })
  eventType?: EventType[];

  @Field(() => [String], { nullable: true })
  userIds?: string[];
}