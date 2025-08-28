import { createNotification } from "../service/NotificationService.js";
import * as RequestExamsService from "../service/requestExamsService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";

export const createRequestExams = async (req, res) => {
  try {
    const requestExamsService = await RequestExamsService.createRequestExams(
      req.body
    );

    await createNotification(
      "doctor",
      DoctorNotificationTypes.EXAM_REQUESTED,
      requestExamsService.requestedBy,
      "Employee",
      {
        examName: requestExamsService.examType,
        patient: requestExamsService.patient,
      }
    );

    res.status(201).json(requestExamsService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRequestExams = async (req, res) => {
  try {
    const requestExamsList = await RequestExamsService.getAllRequestExams();

    if (!requestExamsList || requestExamsList.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum solicitação de exame encontrado" });
    }

    res.status(200).json(requestExamsList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar solicitação de exame",
      error: error.message,
    });
  }
};

export const getRequestExamsById = async (req, res) => {
  try {
    const { id } = req.params;
    const requestExams = await RequestExamsService.getRequestExamsById(id);

    if (!requestExams) {
      return res
        .status(404)
        .json({ message: "Solicitação de exame não encontrada" });
    }

    res.status(200).json(requestExams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar solicitação de exame", error });
  }
};

export const getRequestExamsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const requestExamsList =
      await RequestExamsService.getRequestExamsByPatientId(patientId);

    if (!requestExamsList || requestExamsList.length === 0) {
      return res.status(404).json({
        message:
          "Nenhuma solicitação de exame foi encontrada para este paciente",
      });
    }

    res.status(200).json(requestExamsList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar solicitação de exame do paciente",
      error: error.message,
    });
  }
};

export const markRequestExamsStatusAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequestExams =
      await RequestExamsService.markRequestExamsStatusAsCompleted(id);

    await createNotification(
      "doctor",
      DoctorNotificationTypes.EXAM_RESULT_AVAILABLE,
      updatedRequestExams.requestedBy,
      "Employee",
      {
        examType: updatedRequestExams.examType,
        patient: updatedRequestExams.patient,
      }
    );

    res.status(200).json(updatedRequestExams);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao marcar exame como finalizado",
      error: error.message,
    });
  }
};
