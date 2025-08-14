import { allergiesMedicalRecord } from "../Model/allergiesMedicalRecordModel.js";
import mongoose from "mongoose";

export const createAllergiesMedical = async (data) => {
  const newAllergiesMedical = await allergiesMedicalRecord.create(data);
  return newAllergiesMedical;
};

export const getAllergiesMedicalByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await allergiesMedicalRecord
    .find({ patient: patientId })
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const updateAllergiesMedical = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedAllergiesMedical =
    await allergiesMedicalRecord.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

  if (!updatedAllergiesMedical) {
    throw new Error("Alergia não encontrada");
  }

  return updatedAllergiesMedical;
};

export const deleteAllergiesMedical = async (id) => {
  const deleted = await allergiesMedicalRecord.findByIdAndDelete(id);
  return deleted;
};
