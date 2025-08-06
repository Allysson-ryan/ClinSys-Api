import { AvailableHoursConsultation } from "../Model/AvailableHoursConsultationModel.js";

const create = async (data) => {
  const { doctor, date, hour } = data;

  const existingHour = await AvailableHoursConsultation.findOne({
    doctor,
    date,
    hour,
  });

  if (existingHour) {
    throw new Error("Este horário já está cadastrado para este profissional.");
  }

  return await AvailableHoursConsultation.create(data);
};

const findAll = async () => {
  return await AvailableHoursConsultation.find().populate(
    "doctor",
    "name email"
  );
};

const findById = async (id) => {
  return await AvailableHoursConsultation.findById(id).populate(
    "doctor",
    "name email"
  );
};

const update = async (id, data) => {
  return await AvailableHoursConsultation.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const remove = async (id) => {
  return await AvailableHoursConsultation.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};
