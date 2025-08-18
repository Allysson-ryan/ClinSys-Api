import * as ThyroidFunctionService from "../service/ThyroidFunctionService.js";

export const createThyroidFunction = async (req, res) => {
  try {
    const ThyroidFunction = await ThyroidFunctionService.createThyroidFunction(
      req.body
    );
    res.status(201).json(ThyroidFunction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getThyroidFunctionById = async (req, res) => {
  try {
    const { id } = req.params;
    const ThyroidFunction = await ThyroidFunctionService.getAllThyroidFunction(
      id
    );

    if (!ThyroidFunction) {
      return res
        .status(404)
        .json({ message: "Exame de tireoide não encontrada" });
    }

    res.status(200).json(ThyroidFunction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar exame de tireoide", error });
  }
};

export const getThyroidFunctionByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const ThyroidFunctionList =
      await ThyroidFunctionService.getThyroidFunctionByPatientId(patientId);

    if (!ThyroidFunctionList || ThyroidFunctionList.length === 0) {
      return res.status(404).json({
        message: "Nenhum exame de tireoide encontrado para este paciente",
      });
    }

    res.status(200).json(ThyroidFunctionList);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar exame de tireoide do paciente",
      error: error.message,
    });
  }
};

export const updateThyroidFunction = async (req, res) => {
  try {
    const updatedThyroidFunction =
      await ThyroidFunctionService.updateThyroidFunction(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedThyroidFunction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
