import RequestExams from "../Model/requestExamsModel.js";
import mongoose from "mongoose";

export const createRequestExams = async (data) => {
  const newRequestExams = await RequestExams.create(data);
  return newRequestExams;
};

export const getAllRequestExams = async () => {
  return await RequestExams.find()
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getRequestExamsById = async (id) => {
  return await RequestExams.findById(id)
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getRequestExamsByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await RequestExams.find({ patient: patientId })
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const updateRequestExamStatus = async (id, status) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const allowedStatuses = ["Finalizado", "Entregue"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Status inválido para exame");
  }

  const updatedRequestExams = await RequestExams.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate("patient", "name")
    .populate("requestedBy", "name");

  if (!updatedRequestExams) {
    throw new Error("Solicitação de exame não encontrada");
  }

  return updatedRequestExams;
};
