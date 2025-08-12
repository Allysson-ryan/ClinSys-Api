import { vitalSigns } from "../Model/vitalSignsModel.js";
import mongoose from "mongoose";

export const createVitalSign = async (data) => {
  const newVitalSign = await vitalSigns.create(data);
  return newVitalSign;
};

export const getAllVitalSigns = async () => {
  return await vitalSigns
    .find()
    .populate("patient", "name cpf")
    .populate("nurseName", "name");
};

export const getVitalSignById = async (id) => {
  return await vitalSigns
    .findById(id)
    .populate("patient", "name cpf")
    .populate("nurseName", "name");
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
