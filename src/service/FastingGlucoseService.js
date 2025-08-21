import { FastingGlucose } from "../Model/FastingGlucoseModel.js";
import mongoose from "mongoose";

export const createFastingGlucoseExame = async (data) => {
  const newFastingGlucose = await FastingGlucose.create(data);
  return newFastingGlucose;
};

export const getAllFastingGlucoseExame = async () => {
  return await FastingGlucose.find()
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getFastingGlucoseExameById = async (id) => {
  return await FastingGlucose.findById(id)
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getFastingGlucoseExameByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await FastingGlucose.find({ patient: patientId })
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const updateFastingGlucoseExame = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedFastingGlucoseExame = await FastingGlucose.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedFastingGlucoseExame) {
    throw new Error("Exame de glicose não encontrado");
  }

  return updatedFastingGlucoseExame;
};
