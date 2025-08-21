import * as FastingGlucoseService from "../service/FastingGlucoseService.js";

export const createFastingGlucose = async (req, res) => {
  try {
    const FastingGlucose =
      await FastingGlucoseService.createFastingGlucoseExame(req.body);
    res.status(201).json(FastingGlucose);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllFastingGlucose = async (req, res) => {
  try {
    const fastingGlucoseList =
      await FastingGlucoseService.getAllFastingGlucoseExame();

    if (!fastingGlucoseList || fastingGlucoseList.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum exame de glicose encontrado" });
    }

    res.status(200).json(fastingGlucoseList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar exames de glicose",
      error: error.message,
    });
  }
};

export const getFastingGlucoseById = async (req, res) => {
  try {
    const { id } = req.params;
    const fastingGlucose =
      await FastingGlucoseService.getFastingGlucoseExameById(id);

    if (!fastingGlucose) {
      return res
        .status(404)
        .json({ message: "Exame de glicose não encontrada" });
    }

    res.status(200).json(fastingGlucose);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar exame de glicose", error });
  }
};

export const getFastingGlucoseByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const FastingGlucoseList =
      await FastingGlucoseService.getFastingGlucoseExameByPatientId(patientId);

    if (!FastingGlucoseList || FastingGlucoseList.length === 0) {
      return res.status(404).json({
        message: "Nenhum exame de glicose encontrado para este paciente",
      });
    }

    res.status(200).json(FastingGlucoseList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar exame de glicose do paciente",
      error: error.message,
    });
  }
};

export const updateFastingGlucose = async (req, res) => {
  try {
    const updatedFastingGlucose =
      await FastingGlucoseService.updateFastingGlucoseExame(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedFastingGlucose);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
