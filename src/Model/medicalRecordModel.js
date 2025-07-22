import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },

    medicalHistory: [
      {
        disease: {
          type: String,
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
        observation: {
          type: String,
          required: true,
        },
      },
    ],

    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["ativo", "inativo"],
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
          required: true,
        },
      },
    ],

    notes: [
      {
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        observation: {
          type: String,
          required: true,
        },
      },
    ],

    allergies: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  MedicalRecordSchema
);
