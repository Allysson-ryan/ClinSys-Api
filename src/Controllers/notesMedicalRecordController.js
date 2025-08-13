import * as notesMedicalRecordService from "../service/notesMedicalRecordService.js";

export const createNotesMedicalRecord = async (req, res) => {
  try {
    const notesMedicalRecord =
      await notesMedicalRecordService.createNotesMedical(req.body);
    res.status(201).json(notesMedicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllNotesMedicalRecord = async (req, res) => {
  try {
    const notesMedicalRecord =
      await notesMedicalRecordService.getAllNotesMedical();
    res.status(200).json(notesMedicalRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar anotações médicas", error });
  }
};

export const getNotesMedicalRecordByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const notesMedicalRecordList =
      await notesMedicalRecordService.getNotesMedicalByPatientId(patientId);

    if (!notesMedicalRecordList || notesMedicalRecordList.length === 0) {
      return res.status(404).json({
        message: "Nenhuma anotação médica encontrada para este paciente",
      });
    }

    res.status(200).json(notesMedicalRecordList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar anotações do paciente",
      error: error.message,
    });
  }
};

export const updateNotesMedicalRecord = async (req, res) => {
  try {
    const updatedNotesMedicalRecord =
      await notesMedicalRecordService.updateNotesMedical(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedNotesMedicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNotesMedicalRecord = async (req, res) => {
  try {
    const deleted = await notesMedicalRecordService.deleteNotesMedical(
      req.params.id
    );
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Anotações médicas não encontrada" });
    }
    res.status(200).json({ message: "Anotações médicas removida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar anotações médicas", error });
  }
};
