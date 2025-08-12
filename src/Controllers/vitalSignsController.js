import * as vitalSignsService from "../service/vitalSignsService.js";

export const createVitalSign = async (req, res) => {
  try {
    const vitalSign = await vitalSignsService.createVitalSign(req.body);
    res.status(201).json(vitalSign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllVitalSigns = async (req, res) => {
  try {
    const vitalSigns = await vitalSignsService.getAllVitalSigns();
    res.status(200).json(vitalSigns);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar sinais vitais", error });
  }
};

export const getVitalSignById = async (req, res, next) => {
  try {
    const vitalSign = await vitalSignsService.getVitalSignById(req.params.id);

    if (!vitalSign || vitalSign.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma consulta encontrada para este paciente" });
    }

    res.status(200).json(vitalSign);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar sinal vital", error });
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
