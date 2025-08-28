import appointmentService from "../service/appointmentService.js";
import { createNotification } from "../service/NotificationService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";

function isSameDayBrazil(dateA, dateB) {
  const brasilOffset = -3 * 60;
  const utcA = new Date(dateA.getTime() + dateA.getTimezoneOffset() * 60000);
  const utcB = new Date(dateB.getTime() + dateB.getTimezoneOffset() * 60000);

  const localA = new Date(utcA.getTime() + brasilOffset * 60000);
  const localB = new Date(utcB.getTime() + brasilOffset * 60000);

  return (
    localA.getFullYear() === localB.getFullYear() &&
    localA.getMonth() === localB.getMonth() &&
    localA.getDate() === localB.getDate()
  );
}

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.create(req.body);

    const now = new Date();
    if (isSameDayBrazil(now, appointment.date)) {
      await createNotification(
        "doctor",
        DoctorNotificationTypes.NEW_PATIENT_TODAY,
        appointment.doctor,
        "Employee",
        {
          patientName: appointment.pacientName.name,
          time: appointment.hour.hour,
        }
      );
    }

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const data = await appointmentService.findAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await appointmentService.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByPacientId = async (req, res, next) => {
  try {
    const pacientId = req.params.id;
    const appointments = await appointmentService.findByPacientId(pacientId);

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma consulta encontrada para este paciente" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const updated = await appointmentService.update(req.params.id, req.body);
    const statusNotificationMap = {
      Cancelada: DoctorNotificationTypes.APPOINTMENT_CANCELED,
      "Não Compareceu": DoctorNotificationTypes.APPOINTMENT_NO_SHOW,
    };

    const notificationType = statusNotificationMap[updated.status];

    if (notificationType) {
      await createNotification(
        "doctor",
        notificationType,
        updated.doctor,
        "Employee",
        {
          patientName: updated.pacientName.name,
        }
      );
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
