import availableHoursService from "../service/availableHoursConsultationService.js";

export const createAvailableHour = async (req, res) => {
  try {
    const createdHour = await availableHoursService.create(req.body);
    res.status(201).json(createdHour);
  } catch (error) {
    if (error.message.includes("já está cadastrado")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Erro ao criar horário", error });
  }
};

export const getAllAvailableHours = async (req, res) => {
  try {
    const hours = await availableHoursService.findAll();
    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horários", error });
  }
};

export const getAvailableHourById = async (req, res) => {
  try {
    const hour = await availableHoursService.findById(req.params.id);
    if (!hour) {
      return res.status(404).json({ message: "Horário não encontrado" });
    }
    res.status(200).json(hour);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horário", error });
  }
};

export const updateAvailableHour = async (req, res) => {
  try {
    const updated = await availableHoursService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Horário não encontrado" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar horário", error });
  }
};

export const deleteAvailableHour = async (req, res) => {
  try {
    const deleted = await availableHoursService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Horário não encontrado" });
    }
    res.status(200).json({ message: "Horário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar horário", error });
  }
};
