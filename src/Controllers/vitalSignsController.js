import * as vitalSignsService from "../service/vitalSignsService.js";

export const createVitalSign = async (req, res) => {
  try {
    const vitalSign = await vitalSignsService.createVitalSign(req.body);
    res.status(201).json(vitalSign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVitalSignById = async (req, res) => {
  try {
    const { id } = req.params;
    const vitalSign = await vitalSignsService.getVitalSignById(id);

    if (!vitalSign) {
      return res.status(404).json({ message: "Sinal vital não encontrado" });
    }

    res.status(200).json(vitalSign);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sinal vital", error });
  }
};

export const getVitalSignsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const vitalSignsList = await vitalSignsService.getVitalSignsByPatientId(
      patientId
    );

    if (!vitalSignsList || vitalSignsList.length === 0) {
      return res.status(404).json({
        message: "Nenhum sinal vital encontrado para este paciente",
      });
    }

    res.status(200).json(vitalSignsList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar sinais vitais do paciente",
      error: error.message,
    });
  }
};

export const updateVitalSign = async (req, res) => {
  try {
    const updatedVitalSign = await vitalSignsService.updateVitalSign(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedVitalSign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
