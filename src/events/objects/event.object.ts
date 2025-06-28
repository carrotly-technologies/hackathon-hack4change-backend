import { Field, Float, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { EventDocument } from "@app/events/schemas/event.schema";
import { EventType } from "@app/events/enums/event-type.enum";

@ObjectType()
export class EventObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  place: string;

  @Field(() => [Float])
  localization: number[];

  @Field(() => Date)
  time: Date;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String, { nullable: true })
  link?: string;

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
  }
}
