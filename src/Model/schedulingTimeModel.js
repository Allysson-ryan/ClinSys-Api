import mongoose from "mongoose";

const schedulingTimeSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const schedulingTime = mongoose.model(
  "schedulingTime",
  schedulingTimeSchema
);
