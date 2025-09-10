import * as CompleteBloodExameService from "../service/CompleteBloodExameService.js";

export const createCompleteBloodExame = async (req, res) => {
  try {
    const completeBloodExame =
      await CompleteBloodExameService.createCompleteBlood(req.body);

    res.status(201).json(completeBloodExame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCompleteBloodExame = async (req, res) => {
  try {
    const completeBloodExameList =
      await CompleteBloodExameService.getAllCompleteBlood();

    if (!completeBloodExameList || completeBloodExameList.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum exame de sangue encontrado" });
    }

    res.status(200).json(completeBloodExameList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar exames de sangue",
      error: error.message,
    });
  }
};

export const getCompleteBloodExameById = async (req, res) => {
  try {
    const { id } = req.params;
    const CompleteBloodExame =
      await CompleteBloodExameService.getCompleteBloodById(id);

    if (!CompleteBloodExame) {
      return res
        .status(404)
        .json({ message: "Exame de sangue não encontrada" });
    }

    res.status(200).json(CompleteBloodExame);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar exame de sangue", error });
  }
};

export const getCompleteBloodExameByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const CompleteBloodExameList =
      await CompleteBloodExameService.getCompleteBloodByPatientId(patientId);

    if (!CompleteBloodExameList || CompleteBloodExameList.length === 0) {
      return res.status(404).json({
        message: "Nenhum exame de sangue encontrado para este paciente",
      });
    }

    res.status(200).json(CompleteBloodExameList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar exame de sangue do paciente",
      error: error.message,
    });
  }
};

export const updateCompleteBloodExame = async (req, res) => {
  try {
    const updatedCompleteBloodExame =
      await CompleteBloodExameService.updateCompleteBlood(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedCompleteBloodExame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
