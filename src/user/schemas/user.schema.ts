import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String })
  avatarUrl?: string;

  @Prop({ type: Number, default: 0 })
  coin: number;

  @Prop({ type: [Types.ObjectId], ref: "Award", default: [] })
  awardIds: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
