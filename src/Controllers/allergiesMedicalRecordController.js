import * as allergiesMedicalRecordService from "../service/allergiesMedicalRecordService.js";

export const createAllergiesMedicalRecord = async (req, res) => {
  try {
    const allergiesMedicalRecord =
      await allergiesMedicalRecordService.createAllergiesMedical(req.body);
    res.status(201).json(allergiesMedicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllergiesMedicalRecordByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const allergiesMedicalRecordList =
      await allergiesMedicalRecordService.getAllergiesMedicalByPatientId(
        patientId
      );

    if (
      !allergiesMedicalRecordList ||
      allergiesMedicalRecordList.length === 0
    ) {
      return res.status(404).json({
        message: "Nenhuma alergia encontrada para este paciente",
      });
    }

    res.status(200).json(allergiesMedicalRecordList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar alergias do paciente",
      error: error.message,
    });
  }
};

export const updateAllergiesMedicalRecord = async (req, res) => {
  try {
    const updatedAllergiesMedicalRecord =
      await allergiesMedicalRecordService.updateAllergiesMedical(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedAllergiesMedicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAllergiesMedicalRecord = async (req, res) => {
  try {
    const deleted = await allergiesMedicalRecordService.deleteAllergiesMedical(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({ message: "Alergia não encontrada" });
    }
    res.status(200).json({ message: "Alergia removida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar Alergia", error });
  }
};
