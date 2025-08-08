import { WorkSchedule } from "../Model/workScheduleModel.js";

const isOverlapping = (inicio1, fim1, inicio2, fim2) => {
  return inicio1 < fim2 && inicio2 < fim1;
};

const create = async (data) => {
  const { funcionario, diaSemana, horaInicio, horaFim } = data;

  const existingSchedules = await WorkSchedule.find({
    funcionario,
    diaSemana: new Date(diaSemana),
  });

  const newInicio = horaInicio;
  const newFim = horaFim;

  const conflito = existingSchedules.some((schedule) =>
    isOverlapping(newInicio, newFim, schedule.horaInicio, schedule.horaFim)
  );

  if (conflito) {
    throw {
      status: 400,
      message:
        "Já existe um horário cadastrado nesse intervalo de tempo para esse funcionário.",
    };
  }

  return await WorkSchedule.create(data);
};

const findAll = async () => {
  return await WorkSchedule.find().populate("funcionario", "name email");
};

const findById = async (id) => {
  return await WorkSchedule.findById(id).populate("funcionario", "name email");
};

const update = async (id, data) => {
  return await WorkSchedule.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await WorkSchedule.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};
