import appointmentService from "../service/appointmentService.js";

export const createAppointment = async (req, res, next) => {
  try {
    const data = await appointmentService.create(req.body);
    res.status(201).json(data);
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

export const updateAppointment = async (req, res, next) => {
  try {
    const updated = await appointmentService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
