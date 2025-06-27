import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AwardDocument = Award & Document;

@Schema({ timestamps: true })
export class Award {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true })
  iconUrl: string;

  // TODO: Add challenge reference when challenge module is created
  // @Prop({ type: Types.ObjectId, ref: 'Challenge', required: true })
  // challengeId: Types.ObjectId;
}

export const AwardSchema = SchemaFactory.createForClass(Award);
