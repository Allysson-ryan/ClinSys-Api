import { Prescription } from "../Model/PrescriptionModel.js";
import mongoose from "mongoose";

export const createPrescription = async (data) => {
  const newPrescription = await Prescription.create(data);
  return newPrescription;
};

export const getPrescriptionById = async (id) => {
  return await Prescription.findById(id)
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const getPrescriptionByPatientId = async (patientId) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("ID do paciente inválido");
  }

  return await Prescription.find({ patient: patientId })
    .populate("patient", "name")
    .populate("doctor", "name role crmNumber");
};

export const updatePrescription = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const updatedPrescription = await Prescription.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedPrescription) {
    throw new Error("Prescrição médica não encontrada");
  }

  return updatedPrescription;
};

export const deletePrescription = async (id) => {
  const deleted = await Prescription.findByIdAndDelete(id);
  return deleted;
};
