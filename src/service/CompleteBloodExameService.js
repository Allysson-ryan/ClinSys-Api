import { CompleteBloodExame } from "../Model/CompleteBloodExameModel.js";
import mongoose from "mongoose";

export const createCompleteBlood = async (data) => {
  const newCompleteBloodExame = await CompleteBloodExame.create(data);
  return newCompleteBloodExame;
};

export const getAllCompleteBlood = async () => {
  return await CompleteBloodExame.find()
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getCompleteBloodByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await CompleteBloodExame.find({ patient: patientId })
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const updateCompleteBlood = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedCompleteBloodExame = await CompleteBloodExame.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedCompleteBloodExame) {
    throw new Error("Exame de sangue não encontrado");
  }

  return updatedCompleteBloodExame;
};
