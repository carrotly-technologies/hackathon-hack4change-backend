import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

export type ActivityDocument = Activity & Document;

interface PathPoint {
  lat: string;
  lon: string;
}

@Schema({ timestamps: true })
export class Activity {
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  durationTime: number;

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: Number, required: true })
  trashCount: number;

  @Prop({ type: Number, required: true })
  points: number;

  @Prop({ type: String, enum: ActivityType, required: true })
  activityType: ActivityType;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  imageUrls: string[];

  @Prop({ type: [{ lat: String, lon: String }], required: true })
  path: PathPoint[];

  @Prop({ type: [{ lat: String, lon: String }], required: true })
  trashLocations: PathPoint[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
