const { validationResult } = require("express-validator");

module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Erro de validação nos dados enviados.",
      errors: errors.array(),
    });
  }
  next();
};
