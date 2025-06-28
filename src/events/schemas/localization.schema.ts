import { Schema } from 'mongoose';

export const LocalizationSchema = new Schema({
  name: { type: String, required: true },
  coordinates: {
    type: {
      type: String, // 'Point' for GeoJSON
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
}, { timestamps: true });