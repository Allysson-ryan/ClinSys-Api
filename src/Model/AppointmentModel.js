import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    pacientName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    typeConsultation: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AvailableHoursConsultation",
      required: true,
    },
    annotation: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
