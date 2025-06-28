import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { EventType } from '../enums/event-type.enum';

export type EventDocument = Event & Document;

@Schema()
export class Localization {
  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    required: true
  })
  coordinates: {
    latitude: number;
    longitude: number;
  };

  @Prop({ type: String, required: true })
  name: string;
}

@Schema({ timestamps: true })
export class Event {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Localization, required: true })
  localization: Localization;

  @Prop({ type: Date, required: true })
  time: Date;

  @Prop({ type: String, default: 'https://picsum.photos/64/64' })
  imageUrl: string;

  @Prop({ type: String, enum: Object.values(EventType), required: true })
  eventType: EventType;

  @Prop([{ type: String }])
  userIds: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);