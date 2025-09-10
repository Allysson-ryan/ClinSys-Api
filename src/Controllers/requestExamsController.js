import { createNotification } from "../service/NotificationService.js";
import * as RequestExamsService from "../service/requestExamsService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";
import { ReceptionistNotificationTypes } from "../service/notifications/receptionistNotifications.js";
import { Employee } from "../Model/EmployeeModel.js";
import { nursingNotificationTypes } from "../service/notifications/nursingNotification.js";

export const createRequestExams = async (req, res) => {
  try {
    const requestExamsService = await RequestExamsService.createRequestExams(
      req.body
    );

    await requestExamsService.populate("requestedBy", "name");
    await requestExamsService.populate("patient", "name");

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

    const nurses = await Employee.find({ position: "Enfermeiro" }).select(
      "_id name"
    );

    await Promise.all(
      nurses.map((nurse) =>
        createNotification(
          "nurse",
          nursingNotificationTypes.EXAM_REQUESTED,
          nurse._id,
          "Employee",
          {
            doctorName: requestExamsService.requestedBy.name,
            examName: requestExamsService.examType,
            patientName: requestExamsService.patient.name,
          }
        )
      )
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

export const updateRequestExamsStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequestExams =
      await RequestExamsService.updateRequestExamStatus(id, status);

    if (status === "Finalizado") {
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

      const receptionists = await Employee.find({
        role: "Recepcionista",
      }).select("_id");

      await Promise.all(
        receptionists.map((recep) =>
          createNotification(
            "receptionist",
            ReceptionistNotificationTypes.EXAM_READY_FOR_PICKUP,
            recep._id,
            "Employee",
            {
              examName: updatedRequestExams.examType,
              patientName: updatedRequestExams.patient.name,
            }
          )
        )
      );
    }

    if (status === "Entregue") {
      const receptionists = await Employee.find({
        role: "Recepcionista",
      }).select("_id");

      await Promise.all(
        receptionists.map((recep) =>
          createNotification(
            "receptionist",
            ReceptionistNotificationTypes.EXAM_DELIVERED,
            recep._id,
            "Employee",
            {
              examName: updatedRequestExams.examType,
              patientName: updatedRequestExams.patient.name,
            }
          )
        )
      );
    }

    res.status(200).json(updatedRequestExams);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao atualizar status do exame",
      error: error.message,
    });
  }
};
