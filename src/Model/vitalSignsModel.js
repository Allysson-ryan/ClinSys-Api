import mongoose from "mongoose";

const vitalSignsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    nurseName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: Number,
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    oxygenLevelBlood: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const vitalSigns = mongoose.model("vitalSigns", vitalSignsSchema);
