import { Schema } from 'mongoose';

export const tasksSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
