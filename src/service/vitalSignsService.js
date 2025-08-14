import { vitalSigns } from "../Model/vitalSignsModel.js";
import mongoose from "mongoose";

export const createVitalSign = async (data) => {
  const newVitalSign = await vitalSigns.create(data);
  return newVitalSign;
};

export const getVitalSignById = async (id) => {
  return await vitalSigns
    .findById(id)
    .populate("patient", "name")
    .populate("nurseName", "name role crmNumber");
};

export const getVitalSignsByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID de paciente inválido");
  }

  return await vitalSigns
    .find({ patient: patientId })
    .populate("patient", "name cpf")
    .populate("nurseName", "name role");
};

export const updateVitalSign = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedVitalSign = await vitalSigns.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedVitalSign) {
    throw new Error("Sinal vital não encontrado");
  }

  return updatedVitalSign;
};
