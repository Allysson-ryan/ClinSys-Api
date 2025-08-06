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
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPacientId,
  updateAppointment,
} from "./Controllers/appointmentController.js";
import {
  createAvailableHour,
  getAllAvailableHours,
  getAvailableHourById,
  updateAvailableHour,
  deleteAvailableHour,
} from "./Controllers/availableHoursConsultationController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import validateRequest from "./Middleware/validateRequestMiddleware.js";
import { authorizeSelfOrAdmin } from "./Middleware/authorizationMiddleware.js";
import { authorizeAppointmentAccess } from "./Middleware/authorizationMiddleware.js";

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

router.post(
  "/appointments",
  authMiddleware,
  authorizeAppointmentAccess(),
  createAppointment
);

router.get(
  "/appointments",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllAppointments
);

router.get(
  "/appointments/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAppointmentById
);

router.get(
  "/appointments/patient/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAppointmentsByPacientId
);

router.patch(
  "/appointments/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateAppointment
);

router.post(
  "/horarios",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  createAvailableHour
);
router.get("/horarios", authMiddleware, getAllAvailableHours);
router.get("/horarios/:id", authMiddleware, getAvailableHourById);
router.patch(
  "/horarios/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  updateAvailableHour
);
router.delete(
  "/horarios/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  deleteAvailableHour
);

export default router;

//LEMBRETE:
// authorizeSelfOrAdmin("pacient") —> bloqueia admin
// authorizeSelfOrAdmin("employee") —> libera admin
// authorizeSelfOrAdmin("admin") —> admin só pode editar a si mesmo

// authorizeAppointmentAccess()
// — employee → acesso total (criar, editar, listar qualquer consulta)
// — pacient → acesso apenas às próprias consultas (via req.body.pacientName ou req.params.id)
// — admin → acesso sempre negado
