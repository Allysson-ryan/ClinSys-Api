import { medicalHistory } from "../Model/medicalHistoryModel.js";
import mongoose from "mongoose";

export const createMedicalHistory = async (data) => {
  const newMedicalHistory = await medicalHistory.create(data);
  return newMedicalHistory;
};

export const getMedicalHistoryById = async (id) => {
  return await medicalHistory
    .findById(id)
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const getMedicalHistoryByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await medicalHistory
    .find({ patient: patientId })
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const updateMedicalHistory = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedMedicalHistory = await medicalHistory.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedMedicalHistory) {
    throw new Error("Histórico médico não encontrado");
  }

  return updatedMedicalHistory;
};

export const deleteMedicalHistory = async (id) => {
  const deleted = await medicalHistory.findByIdAndDelete(id);
  return deleted;
};
