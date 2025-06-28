import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { EventType } from '../enums/event-type.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  place: string;

  @Prop({ type: [Number], required: true })
  localization: [number, number];

  @Prop({ type: Date, required: true })
  time: Date;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, default: 'https://picsum.photos/64/64' })
  imageUrl: string;

  @Prop({ type: String, enum: Object.values(EventType), required: true })
  eventType: EventType;

  @Prop([{ type: String }])
  userIds: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);