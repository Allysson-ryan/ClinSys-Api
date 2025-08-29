import appointmentService from "../service/appointmentService.js";
import { createNotification } from "../service/NotificationService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";
import { ReceptionistNotificationTypes } from "../service/notifications/receptionistNotifications.js";
import { Employee } from "../Model/EmployeeModel.js";
import { todayBrazilYYYYMMDD } from "../utils/date.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.create(req.body);

    const today = todayBrazilYYYYMMDD();
    const appointmentDate = appointment.hour?.date;

    if (appointmentDate && appointmentDate === today) {
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

export const getAppointmentsByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const appointments = await appointmentService.findByDoctorId(doctorId);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        message: "Nenhuma consulta encontrada para este profissional",
      });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  // ----------------- MAP DE NOTIFICAÇÕES PARA MÉDICO -----------------
  try {
    const updated = await appointmentService.update(req.params.id, req.body);

    const statusNotificationMap = {
      Cancelada: {
        type: DoctorNotificationTypes.APPOINTMENT_CANCELED,
        getPayload: (appt) => ({
          patientName: appt.pacientName.name,
        }),
      },
      "Não Compareceu": {
        type: DoctorNotificationTypes.APPOINTMENT_NO_SHOW,
        getPayload: (appt) => ({
          patientName: appt.pacientName.name,
        }),
      },
      Remarcado: {
        type: DoctorNotificationTypes.SCHEDULE_CHANGED,
        getPayload: (appt) => ({
          patientName: appt.pacientName.name,
          date: appt.hour.date,
          time: appt.hour?.hour,
        }),
      },
    };

    const notificationConfig = statusNotificationMap[updated.status];

    if (notificationConfig) {
      await createNotification(
        "doctor",
        notificationConfig.type,
        updated.doctor,
        "Employee",
        notificationConfig.getPayload(updated)
      );
    }

    // ----------------- MAP DE NOTIFICAÇÕES PARA RECEPCIONISTA -----------------
    const receptionistStatusNotificationMap = {
      Confirmada: {
        type: ReceptionistNotificationTypes.APPOINTMENT_CONFIRMED,
        getPayload: (appt) => ({
          doctorName: updated.doctor.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
        }),
      },
      Cancelada: {
        type: ReceptionistNotificationTypes.APPOINTMENT_CANCELED,
        getPayload: (appt) => ({
          doctorName: appt.doctor.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
        }),
      },
      Remarcado: {
        type: ReceptionistNotificationTypes.APPOINTMENT_RESCHEDULED,
        getPayload: (appt) => ({
          doctorName: appt.doctor.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
          time: appt.hour?.hour,
        }),
      },
    };

    const receptionistConfig =
      receptionistStatusNotificationMap[updated.status];
    if (receptionistConfig) {
      const receptionists = await Employee.find({
        role: "Recepcionista",
      }).select("_id");

      await Promise.all(
        receptionists.map((recep) =>
          createNotification(
            "receptionist",
            receptionistConfig.type,
            recep._id,
            "Employee",
            receptionistConfig.getPayload(updated)
          )
        )
      );
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
