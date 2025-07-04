import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ChallengeType } from "@app/challenges/enum/challenge-type.enum";

export type ChallengeDocument = Challenge & Document;

@Schema({ timestamps: true })
export class Challenge {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true })
  topic: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  points: number;

  @Prop({ type: Number, required: true, default: 0 })
  coin: number;

  @Prop({ type: String, required: true })
  iconUrl: string;

  @Prop({
    type: String,
    enum: ChallengeType,
    required: true,
    default: ChallengeType.OWN,
  })
  type: ChallengeType;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
