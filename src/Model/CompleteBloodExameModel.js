import mongoose from "mongoose";

const completeBloodExameSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    requestedAt: {
      type: Date,
    },
    collectedAt: {
      type: Date,
    },
    RBC: {
      type: Number,
      required: true,
    },
    Ht: {
      type: Number,
      required: true,
    },
    Hb: {
      type: Number,
      required: true,
    },
    VCM: {
      type: Number,
      required: true,
    },
    HCM: {
      type: Number,
      required: true,
    },
    CHCM: {
      type: Number,
      required: true,
    },
    RDW: {
      type: Number,
      required: true,
    },
    leukocytes: {
      type: Number,
      required: true,
    },
    monocytes: {
      type: Number,
      required: true,
    },
    neutrophilsSegmented: {
      type: Number,
      required: true,
    },
    eosinophils: {
      type: Number,
      required: true,
    },
    neutrophilsBands: {
      type: Number,
      required: true,
    },
    basophils: {
      type: Number,
      required: true,
    },
    lymphocytes: {
      type: Number,
      required: true,
    },
    platelets: {
      type: Number,
      required: true,
    },
    MPV: {
      type: Number,
      required: true,
    },
    observation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CompleteBloodExame = mongoose.model(
  "CompleteBloodExame",
  completeBloodExameSchema
);
