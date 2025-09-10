import employeeAuthService from "../service/employeeService.js";
import { createNotification } from "../service/NotificationService.js";
import { ReceptionistNotificationTypes } from "../service/notifications/receptionistNotifications.js";
import { Employee } from "../Model/EmployeeModel.js";

export const registerEmployee = async (req, res, next) => {
  try {
    const data = await employeeAuthService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const loginEmployee = async (req, res, next) => {
  try {
    const data = await employeeAuthService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeAuthService.getAll();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeAuthService.getById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const updated = await employeeAuthService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await employeeAuthService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const markEmployeeAbsence = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { scheduleId, reason } = req.body;

    const schedule = await employeeAuthService.markAbsence(
      employeeId,
      scheduleId,
      reason
    );

    const receptionists = await Employee.find({
      $or: [{ role: "Recepcionista" }, { position: "Recepcionista" }],
    }).select("_id");

    await Promise.all(
      receptionists.map((recep) =>
        createNotification(
          "receptionist",
          ReceptionistNotificationTypes.PROFESSIONAL_ABSENCE,
          recep._id,
          "Employee",
          {
            professionalName: schedule.funcionario.name,
            start: schedule.horaInicio,
            end: schedule.horaFim,
          }
        )
      )
    );

    return res.status(200).json({
      message: "Ausência registrada e notificação enviada com sucesso.",
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao registrar ausência.",
      error: error.message,
    });
  }
};

export const markEmployeePresence = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { scheduleId } = req.body;

    const schedule = await employeeAuthService.markPresence(
      employeeId,
      scheduleId
    );

    return res.status(200).json({
      message: "Presença registrada com sucesso.",
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao registrar presença.",
      error: error.message,
    });
  }
};
