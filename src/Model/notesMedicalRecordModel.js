import mongoose from "mongoose";

const notesMedicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const notesMedicalRecord = mongoose.model(
  "notesMedicalRecord",
  notesMedicalRecordSchema
);
