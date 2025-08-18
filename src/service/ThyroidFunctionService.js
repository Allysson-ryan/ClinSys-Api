import { ThyroidFunction } from "../Model/ThyroidFunctionModel.js";
import mongoose from "mongoose";

export const createThyroidFunction = async (data) => {
  const newThyroidFunction = await ThyroidFunction.create(data);
  return newThyroidFunction;
};

export const getAllThyroidFunction = async () => {
  return await ThyroidFunction.find()
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const getThyroidFunctionByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await ThyroidFunction.find({ patient: patientId })
    .populate("patient", "name")
    .populate("requestedBy", "name role crmNumber");
};

export const updateThyroidFunction = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedThyroidFunction = await ThyroidFunction.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedThyroidFunction) {
    throw new Error("Exame de tireoide não encontrado");
  }

  return updatedThyroidFunction;
};
