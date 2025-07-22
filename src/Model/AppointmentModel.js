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
      ref: "schedulingTime",
      required: true,
    },
    annotation: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
