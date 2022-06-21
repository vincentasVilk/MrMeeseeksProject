import { Schema } from 'mongoose';

export const MrMeeseeksSchema = new Schema(
  {
    startedAt: Date,
    taskId: String,
    survived: Number,
  },
  {
    timestamps: true,
  },
);
