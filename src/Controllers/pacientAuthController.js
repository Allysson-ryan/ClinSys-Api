const PacientService = require("../Service/pacientAuthService");

exports.createPacient = async (req, res, next) => {
  try {
    const pacient = await PacientService.create(req.body);
    res.status(201).json(pacient);
  } catch (err) {
    next(err);
  }
};

exports.loginPacient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await PacientService.login(email, password);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getAllPacients = async (req, res, next) => {
  try {
    const pacients = await PacientService.findAll();
    res.status(200).json(pacients);
  } catch (err) {
    next(err);
  }
};

exports.getPacientById = async (req, res, next) => {
  try {
    const pacient = await PacientService.findById(req.params.id);
    if (!pacient) {
      return res.status(404).json({ error: "Paciente não encontrado." });
    }
    res.status(200).json(pacient);
  } catch (err) {
    next(err);
  }
};

exports.updatePacient = async (req, res, next) => {
  try {
    const updated = await PacientService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Paciente não encontrado." });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
