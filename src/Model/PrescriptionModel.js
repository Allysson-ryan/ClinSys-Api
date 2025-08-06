import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema(
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
    medicationName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Prescription = mongoose.model("Prescription", PrescriptionSchema);
