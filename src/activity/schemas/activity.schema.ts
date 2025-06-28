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

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: Date })
  startTime?: Date;

  @Prop({ type: Date })
  endTime?: Date;

  @Prop({ type: Number, default: 0 })
  durationTime: number;

  @Prop({ type: Number, default: 0 })
  distance: number;

  @Prop({ type: Number, default: 0 })
  trashCount: number;

  @Prop({ type: Number, default: 0 })
  points: number;

  @Prop({ type: String, enum: ActivityType, required: true })
  activityType: ActivityType;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop({ type: [{ lat: String, lon: String }], default: [] })
  path: PathPoint[];

  @Prop({ type: [{ lat: String, lon: String }], default: [] })
  trashLocations: PathPoint[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
