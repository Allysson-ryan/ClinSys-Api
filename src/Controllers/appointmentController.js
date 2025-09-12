import appointmentService from "../service/appointmentService.js";
import { createNotification } from "../service/NotificationService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";
import { ReceptionistNotificationTypes } from "../service/notifications/receptionistNotifications.js";
import { Employee } from "../Model/EmployeeModel.js";
import { todayBrazilYYYYMMDD } from "../utils/date.js";
import { nursingNotificationTypes } from "../service/notifications/nursingNotification.js";
import { Appointment } from "../Model/AppointmentModel.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.create(req.body);

    const today = todayBrazilYYYYMMDD();
    const appointmentDate = appointment.hour?.date;

    if (appointmentDate && appointmentDate === today) {
      const employee = await Employee.findById(appointment.doctor).select(
        "position name"
      );

      if (!employee) {
        throw new Error("Profissional não encontrado.");
      }

      if (employee.position === "Médico") {
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

      if (employee.position === "Enfermeiro") {
        await createNotification(
          "nurse",
          nursingNotificationTypes.NEW_PATIENT_TODAY,
          appointment.doctor,
          "Employee",
          {
            patientName: appointment.pacientName.name,
            time: appointment.hour.hour,
          }
        );
      }
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
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("doctor", "name position")
      .populate("pacientName", "name")
      .populate("hour");

    if (!updated) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    const employee = updated.doctor;

    // ----------------- NOTIFICAÇÕES DO PROFISSIONAL DA SAÚDE-----------------
    if (employee?.position === "Médico") {
      const doctorStatusNotificationMap = {
        Cancelada: {
          type: DoctorNotificationTypes.APPOINTMENT_CANCELED,
          getPayload: (appt) => ({ patientName: appt.pacientName.name }),
        },
        "Não Compareceu": {
          type: DoctorNotificationTypes.APPOINTMENT_NO_SHOW,
          getPayload: (appt) => ({ patientName: appt.pacientName.name }),
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

      const doctorConfig = doctorStatusNotificationMap[updated.status];
      if (doctorConfig) {
        await createNotification(
          "doctor",
          doctorConfig.type,
          employee._id,
          "Employee",
          doctorConfig.getPayload(updated)
        );
      }
    }

    if (employee?.position === "Enfermeiro") {
      const nurseStatusNotificationMap = {
        Cancelada: {
          type: nursingNotificationTypes.APPOINTMENT_CANCELED,
          getPayload: (appt) => ({ patientName: appt.pacientName.name }),
        },
        "Não Compareceu": {
          type: nursingNotificationTypes.APPOINTMENT_NO_SHOW,
          getPayload: (appt) => ({ patientName: appt.pacientName.name }),
        },
        Remarcado: {
          type: nursingNotificationTypes.SCHEDULE_CHANGED,
          getPayload: (appt) => ({
            patientName: appt.pacientName.name,
            date: appt.hour.date,
            time: appt.hour?.hour,
          }),
        },
      };

      const nurseConfig = nurseStatusNotificationMap[updated.status];
      if (nurseConfig) {
        await createNotification(
          "nurse",
          nurseConfig.type,
          employee._id,
          "Employee",
          nurseConfig.getPayload(updated)
        );
      }
    }

    // ----------------- NOTIFICAÇÕES PARA RECEPCIONISTA -----------------
    const receptionistStatusNotificationMap = {
      Confirmada: {
        type: ReceptionistNotificationTypes.APPOINTMENT_CONFIRMED,
        getPayload: (appt, emp) => ({
          professionalName: emp.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
          time: appt.hour?.hour,
          type: emp.position === "Médico" ? "consulta" : "vacina",
        }),
      },
      Cancelada: {
        type: ReceptionistNotificationTypes.APPOINTMENT_CANCELED,
        getPayload: (appt, emp) => ({
          professionalName: emp.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
          type: emp.position === "Médico" ? "consulta" : "vacina",
        }),
      },
      Remarcado: {
        type: ReceptionistNotificationTypes.APPOINTMENT_RESCHEDULED,
        getPayload: (appt, emp) => ({
          professionalName: emp.name,
          patientName: appt.pacientName.name,
          date: appt.hour.date,
          time: appt.hour?.hour,
          type: emp.position === "Médico" ? "consulta" : "vacina",
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
            receptionistConfig.getPayload(updated, employee)
          )
        )
      );
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
