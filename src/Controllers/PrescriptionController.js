import * as PrescriptionService from "../service/PrescriptionService.js";

export const createMedicalPrescription = async (req, res) => {
  try {
    const medicalPrescription = await PrescriptionService.createPrescription(
      req.body
    );
    res.status(201).json(medicalPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMedicalPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicalPrescription = await PrescriptionService.getPrescriptionById(
      id
    );

    if (!medicalPrescription) {
      return res
        .status(404)
        .json({ message: "Prescrição médica não encontrada" });
    }

    res.status(200).json(medicalPrescription);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar Prescrição médica", error });
  }
};

export const getMedicalPrescriptionByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const medicalPrescriptionList =
      await PrescriptionService.getPrescriptionByPatientId(patientId);

    if (!medicalPrescriptionList || medicalPrescriptionList.length === 0) {
      return res.status(404).json({
        message: "Nenhuma prescrição médica encontrada para este paciente",
      });
    }

    res.status(200).json(medicalPrescriptionList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar prescrição médica do paciente",
      error: error.message,
    });
  }
};

export const updateMedicalPrescription = async (req, res) => {
  try {
    const updatedmedicalPrescription =
      await PrescriptionService.updatePrescription(req.params.id, req.body);
    res.status(200).json(updatedmedicalPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedicalPrescription = async (req, res) => {
  try {
    const deleted = await PrescriptionService.deletePrescription(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Prescrição médica não encontrada" });
    }
    res.status(200).json({ message: "Prescrição médica removida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar prescrição médica", error });
  }
};
