import mongoose from "mongoose";

const fastingGlucoseSchema = new mongoose.Schema(
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
    glucoseLevel: {
      type: Number,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const FastingGlucose = mongoose.model(
  "FastingGlucose",
  fastingGlucoseSchema
);
