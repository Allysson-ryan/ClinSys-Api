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
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const AvailableHoursConsultation = mongoose.model(
  "AvailableHoursConsultation",
  AvailableHoursConsultationSchema
);
