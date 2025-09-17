import { PaymentAppointment } from "../Model/paymentAppointmentModel.js";
import { Appointment } from "../Model/AppointmentModel.js";

const create = async (data) => {
  const appointment = await Appointment.findById(data.appointment)
    .populate("pacientName", "name")
    .populate("hour", "date hour");

  if (!appointment) {
    throw new Error("Consulta não encontrada.");
  }

  if (appointment.paymentStatus === "Pago") {
    throw new Error("Este agendamento já foi pago.");
  }

  const payment = await PaymentAppointment.create({
    appointment: data.appointment,
    price: data.price,
    paymentMethod: data.paymentMethod,
  });

  appointment.paymentStatus = "Pago";
  await appointment.save();

  return payment.populate({
    path: "appointment",
    populate: [
      { path: "pacientName", select: "name" },
      { path: "hour", select: "date hour" },
    ],
  });
};

const findAll = async () => {
  return PaymentAppointment.find()
    .populate({
      path: "appointment",
      populate: [
        { path: "pacientName", select: "name" },
        { path: "hour", select: "date hour" },
      ],
    })
    .sort({ createdAt: -1 });
};

const findById = async (id) => {
  return PaymentAppointment.findById(id).populate({
    path: "appointment",
    populate: [
      { path: "pacientName", select: "name" },
      { path: "hour", select: "date hour" },
    ],
  });
};

export default {
  create,
  findAll,
  findById,
};
