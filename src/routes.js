const express = require("express");
const router = express.Router();
import {
  createPacient,
  loginPacient,
} from "./Controllers/pacientAuthController";
import {
  registerEmployee,
  loginEmployee,
} from "../controllers/employeeAuthController.js";
import {
  registerAdmin,
  loginAdmin,
} from "../controllers/adminAuthController.js";
const auth = require("./Middleware/authMiddleware");
const validateRequest = require("./Middleware/validateRequestMiddleware");

router.post("/cadastrar/paciente", validateRequest, createPacient);
router.post("/entrar/paciente", validateRequest, loginPacient);
router.post("/cadastrar/funcionario", validateRequest, registerEmployee);
router.post("/entrar/funcionario", validateRequest, loginEmployee);
router.post("/cadastrar/admin", validateRequest, registerAdmin);
router.post("/entrar/admin", validateRequest, loginAdmin);

export default router;
