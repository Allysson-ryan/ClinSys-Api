import mongoose from "mongoose";

const PaymentAppointmentSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PaymentAppointment = mongoose.model(
  "PaymentAppointment",
  PaymentAppointmentSchema
);
