import { ExampleColor } from '@app/example-module/enum/example-color.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExampleDocument = Example & Document;

@Schema({ timestamps: true })
export class Example {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, enum: ExampleColor, required: true })
  color: ExampleColor;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
