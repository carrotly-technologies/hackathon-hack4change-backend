import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { EventDocument } from '@app/events/schemas/event.schema';
import { EventType } from '@app/events/enums/event-type.enum';

@ObjectType()
export class LocalizationObject {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  latitude: number;

  @Field(() => Number)
  longitude: number;
}

@ObjectType()
export class EventObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => LocalizationObject)
  localization: LocalizationObject;

  @Field(() => Date)
  time: Date;

  @Field(() => String)
  imageUrl: string;

  @Field(() => EventType)
  eventType: EventType;

  @Field(() => [String])
  userIds: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: EventDocument | EventObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as EventDocument).toObject({ virtuals: true })
        : input),
    });

    // Transform localization coordinates if needed
    if (input.localization && (input as EventDocument).localization?.coordinates) {
      this.localization = {
        name: input.localization.name,
        latitude: (input as EventDocument).localization.coordinates.latitude,
        longitude: (input as EventDocument).localization.coordinates.longitude,
      };
    }
  }
}