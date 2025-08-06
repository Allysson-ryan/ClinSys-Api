import { Appointment } from "../Model/AppointmentModel.js";

const create = async (data) => {
  const appointment = await Appointment.create(data);
  return appointment;
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

const update = async (id, data) => {
  const updated = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updated;
};

export default {
  create,
  findAll,
  findById,
  findByPacientId,
  update,
};
