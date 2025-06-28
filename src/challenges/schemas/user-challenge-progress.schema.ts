import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserChallengeProgressDocument = UserChallengeProgress & Document;

export enum ChallengeStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Schema({ timestamps: true })
export class UserChallengeProgress {
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Challenge", required: true })
  challengeId: Types.ObjectId;

  @Prop({ type: Number, required: true, default: 0, min: 0, max: 100 })
  progress: number;

  @Prop({
    type: String,
    enum: ChallengeStatus,
    required: true,
    default: ChallengeStatus.IN_PROGRESS,
  })
  status: ChallengeStatus;

  @Prop({ type: Date, required: true, default: Date.now })
  startedAt: Date;

  @Prop({ type: Date })
  completedAt?: Date;
}

export const UserChallengeProgressSchema = SchemaFactory.createForClass(
  UserChallengeProgress,
);

// Create compound index to ensure one progress record per user-challenge combination
UserChallengeProgressSchema.index(
  { userId: 1, challengeId: 1 },
  { unique: true },
);
