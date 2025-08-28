import workScheduleService from "../service/workScheduleService.js";
import { createNotification } from "../service/NotificationService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";

export const createWorkSchedule = async (req, res) => {
  try {
    const created = await workScheduleService.create(req.body);

    await createNotification(
      "doctor",
      DoctorNotificationTypes.WORK_SCHEDULE_ADDED,
      created.funcionario,
      "Employee"
    );

    res.status(201).json(created);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao criar horário", error });
  }
};

export const getAllWorkSchedules = async (req, res) => {
  try {
    const list = await workScheduleService.findAll();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horário", error });
  }
};

export const getWorkScheduleById = async (req, res) => {
  try {
    const schedule = await workScheduleService.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "horário não encontrado" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horário", error });
  }
};

export const updateWorkSchedule = async (req, res) => {
  try {
    const updated = await workScheduleService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "horário não encontrado" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar horário", error });
  }
};

export const deleteWorkSchedule = async (req, res) => {
  try {
    const deleted = await workScheduleService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "horário não encontrado" });
    }
    res.status(200).json({ message: "horário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar horário", error });
  }
};
