import paymentService from "../service/paymenAppointmentService.js";
import { createNotification } from "../service/NotificationService.js";
import { ReceptionistNotificationTypes } from "../service/notifications/receptionistNotifications.js";
import { Appointment } from "../Model/AppointmentModel.js";
import { Employee } from "../Model/EmployeeModel.js";
import { formatCurrencyBRL } from "../utils/formatCurrency.js";

export const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.create(req.body);

    const appointment = await Appointment.findById(payment.appointment)
      .populate("pacientName", "name")
      .populate("doctor", "name position");

    if (!appointment) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    const receptionists = await Employee.find({ role: "Recepcionista" }).select(
      "_id"
    );

    let type = null;
    if (appointment.doctor.position === "Médico") {
      type = "consulta";
    } else if (appointment.doctor.position === "Enfermeiro") {
      type = "vacina";
    }

    if (!type) {
      return res.status(400).json({
        message: "Cargo do profissional não suportado para pagamento.",
      });
    }

    const payload = {
      type: appointment.doctor.position === "Médico" ? "consulta" : "vacina",
      pacientName: appointment.pacientName.name,
      professionalName: appointment.doctor.name,
      price: formatCurrencyBRL(payment.price),
    };

    await Promise.all(
      receptionists.map((recep) =>
        createNotification(
          "receptionist",
          ReceptionistNotificationTypes.PAYMENT_MADE,
          recep._id,
          "Employee",
          payload
        )
      )
    );

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.findAll();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Pagamento não encontrado" });
    }
    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};
