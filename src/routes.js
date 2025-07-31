import express from "express";
const router = express.Router();
import {
  createPacient,
  loginPacient,
  getAllPacients,
  getPacientById,
  updatePacient,
} from "./Controllers/pacientController.js";
import {
  registerEmployee,
  loginEmployee,
} from "./Controllers/employeeController.js";
import { registerAdmin, loginAdmin } from "./Controllers/adminController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import validateRequest from "./Middleware/validateRequestMiddleware.js";

router.post("/cadastrar/paciente", validateRequest, createPacient);
router.post("/entrar/paciente", validateRequest, loginPacient);
router.post("/cadastrar/funcionario", validateRequest, registerEmployee);
router.post("/entrar/funcionario", validateRequest, loginEmployee);
router.post("/cadastrar/admin", validateRequest, registerAdmin);
router.post("/entrar/admin", validateRequest, loginAdmin);

// Rotas protegidas
router.get("/paciente", authMiddleware, getAllPacients);
router.get("/paciente/:id", authMiddleware, getPacientById);
router.patch("/paciente/:id", authMiddleware, updatePacient);

export default router;
