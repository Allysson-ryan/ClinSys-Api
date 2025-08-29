import { Appointment } from "../Model/AppointmentModel.js";

const create = async (data) => {
  const appointment = await Appointment.create(data);

  const populated = await Appointment.findById(appointment._id)
    .populate("pacientName", "name")
    .populate("hour", "date hour");

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
  const updated = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate("pacientName", "name")
    .populate("hour", "hour date")
    .populate("doctor", "name role");
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
