import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MarketplaceDocument = Marketplace & Document;

@Schema({ timestamps: true })
export class Marketplace {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;
}

export const MarketplaceSchema = SchemaFactory.createForClass(Marketplace);
