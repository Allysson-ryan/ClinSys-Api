import mongoose from "mongoose";

const thyroidFunctionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedAt: {
      type: Date,
    },
    status: {
      type: String,
      default: true,
    },
    collectedAt: {
      type: Date,
    },
    tsh: {
      type: Number,
      required: true,
    },
    t3: {
      type: Number,
      required: true,
    },
    t4: {
      type: Number,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ThyroidFunction = mongoose.model(
  "ThyroidFunction",
  thyroidFunctionSchema
);
