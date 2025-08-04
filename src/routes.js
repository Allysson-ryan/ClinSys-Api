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
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./Controllers/employeeController.js";
import {
  registerAdmin,
  loginAdmin,
  getAlladmin,
  updateAdmin,
  deleteAdmin,
} from "./Controllers/adminController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import validateRequest from "./Middleware/validateRequestMiddleware.js";
import { authorizeSelfOrAdmin } from "./Middleware/authorizationMiddleware.js";

router.post("/cadastrar/paciente", validateRequest, createPacient);
router.post("/entrar/paciente", validateRequest, loginPacient);

router.post("/cadastrar/funcionario", validateRequest, registerEmployee);
router.post("/entrar/funcionario", validateRequest, loginEmployee);

router.post("/cadastrar/admin", validateRequest, registerAdmin);
router.post("/entrar/admin", validateRequest, loginAdmin);

// Rotas protegidas
router.get("/paciente", authMiddleware, getAllPacients);
router.get(
  "/paciente/:id",
  authMiddleware,
  authorizeSelfOrAdmin("pacient"),
  getPacientById
);
router.patch(
  "/paciente/:id",
  authMiddleware,
  authorizeSelfOrAdmin("pacient"),
  updatePacient
);

router.get(
  "/admin",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  getAlladmin
);
router.patch(
  "/admin/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  updateAdmin
);
router.delete(
  "/admin/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  deleteAdmin
);

router.get("/funcionario", authMiddleware, getAllEmployees);
router.get(
  "/funcionario/:id",
  authMiddleware,
  authorizeSelfOrAdmin("employee"),
  getEmployeeById
);
router.patch(
  "/funcionario/:id",
  authMiddleware,
  authorizeSelfOrAdmin("employee"),
  updateEmployee
);
router.delete(
  "/funcionario/:id",
  authMiddleware,
  authorizeSelfOrAdmin("employee"),
  deleteEmployee
);

export default router;
