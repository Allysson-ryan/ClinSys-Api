import { Appointment } from "../Model/AppointmentModel.js";
import { AvailableHoursConsultation } from "../Model/AvailableHoursConsultationModel.js";

const create = async (data) => {
  const hourDoc = await AvailableHoursConsultation.findById(data.hour);
  if (!hourDoc) {
    throw new Error("Horário não encontrado.");
  }

  if (hourDoc.status === "Marcado") {
    throw new Error("Este horário já está marcado e não pode ser usado.");
  }

  const appointment = await Appointment.create(data);

  await AvailableHoursConsultation.findByIdAndUpdate(
    appointment.hour,
    { status: "Marcado" },
    { new: true }
  );

  const populated = await Appointment.findById(appointment._id)
    .populate("pacientName", "name")
    .populate("hour", "date hour status");

  return populated;
};

const findAll = async () => {
  const appointments = await Appointment.find()
    .populate("pacientName", "name")
    .populate("hour", "time");
  return appointments;
};

const findById = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate("pacientName", "name")
    .populate("hour", "time");
  return appointment;
};

const findByPacientId = async (pacientId) => {
  const appointments = await Appointment.find({ pacientName: pacientId })
    .populate("pacientName", "name")
    .populate("hour", "time");

  return appointments;
};

const findByDoctorId = async (doctorId) => {
  const appointments = await Appointment.find({ doctor: doctorId })
    .populate("pacientName", "name")
    .populate("hour", "date hour");
  return appointments;
};

const update = async (id, data) => {
  const oldAppointment = await Appointment.findById(id);

  const updated = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate("pacientName", "name")
    .populate("hour", "hour date status")
    .populate("doctor", "name role");

  if (data.status === "Cancelada" && oldAppointment?.hour) {
    await AvailableHoursConsultation.findByIdAndUpdate(oldAppointment.hour, {
      status: "Disponível",
    });
  }

  return updated;
};

export default {
  create,
  findAll,
  findById,
  findByPacientId,
  findByDoctorId,
  update,
};
