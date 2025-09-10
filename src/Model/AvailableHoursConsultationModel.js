import mongoose from "mongoose";

const AvailableHoursConsultationSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    hour: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AvailableHoursConsultation = mongoose.model(
  "AvailableHoursConsultation",
  AvailableHoursConsultationSchema
);
