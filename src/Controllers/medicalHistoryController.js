import * as medicalHistoryService from "../service/medicalHistoryService.js";

export const createMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await medicalHistoryService.createMedicalHistory(
      req.body
    );
    res.status(201).json(medicalHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await medicalHistoryService.getAllMedicalHistory();
    res.status(200).json(medicalHistory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar o histórico médico", error });
  }
};

export const getMedicalHistoryByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const medicalHistoryList =
      await medicalHistoryService.getMedicalHistoryByPatientId(patientId);

    if (!medicalHistoryList || medicalHistoryList.length === 0) {
      return res.status(404).json({
        message: "Nenhum histórico médico encontrado para este paciente",
      });
    }

    res.status(200).json(medicalHistoryList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar histórico médico do paciente",
      error: error.message,
    });
  }
};

export const updateMedicalHistory = async (req, res) => {
  try {
    const updatedMedicalHistory =
      await medicalHistoryService.updateMedicalHistory(req.params.id, req.body);
    res.status(200).json(updatedMedicalHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedicalHistory = async (req, res) => {
  try {
    const deleted = await medicalHistoryService.deleteMedicalHistory(
      req.params.id
    );
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "histórico médico não encontrado" });
    }
    res.status(200).json({ message: "histórico médico removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar histórico médico", error });
  }
};
