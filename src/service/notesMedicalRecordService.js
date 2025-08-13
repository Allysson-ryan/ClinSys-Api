import { notesMedicalRecord } from "../Model/notesMedicalRecordModel.js";
import mongoose from "mongoose";

export const createNotesMedical = async (data) => {
  const newNotesMedical = await notesMedicalRecord.create(data);
  return newNotesMedical;
};

export const getAllNotesMedical = async () => {
  return await notesMedicalRecord
    .find()
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const getNotesMedicalByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await notesMedicalRecord
    .find({ patient: patientId })
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const updateNotesMedical = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedNotesMedical = await notesMedicalRecord.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedNotesMedical) {
    throw new Error("Anotações médicas não encontrado");
  }

  return updatedNotesMedical;
};

export const deleteNotesMedical = async (id) => {
  const deleted = await notesMedicalRecord.findByIdAndDelete(id);
  return deleted;
};
