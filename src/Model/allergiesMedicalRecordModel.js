import mongoose from "mongoose";

const allergiesMedicalRecordSchema = new mongoose.Schema(
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
    allergiesName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const allergiesMedicalRecord = mongoose.model(
  "allergiesMedicalRecord",
  allergiesMedicalRecordSchema
);
