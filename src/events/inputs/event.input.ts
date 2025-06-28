import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { EventType } from '../enums/event-type.enum';
import { LocalizationInput } from './localization.input';

@InputType()
export class EventInput {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => LocalizationInput)
  localization: LocalizationInput;

  @Field(() => String)
  time: string;

  @Field(() => String)
  imageIcon: string;

  @Field(() => EventType)
  eventType: EventType;

  @Field(() => [String])
  userIds: string[];
}