import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    diseaseName: {
      type: String,
      required: true,
    },
    diagnosticSummary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const medicalHistory = mongoose.model(
  "medicalHistory",
  medicalHistorySchema
);
