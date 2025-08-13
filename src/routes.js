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
import {
  createWorkSchedule,
  getAllWorkSchedules,
  getWorkScheduleById,
  updateWorkSchedule,
  deleteWorkSchedule,
} from "./Controllers/workScheduleController.js";
import {
  createVitalSign,
  getAllVitalSigns,
  getVitalSignsByPatientId,
  updateVitalSign,
} from "./Controllers/vitalSignsController.js";
import {
  createMedicalHistory,
  getAllMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
  getMedicalHistoryByPatientId,
} from "./Controllers/medicalHistoryController.js";
import {
  createNotesMedicalRecord,
  deleteNotesMedicalRecord,
  getAllNotesMedicalRecord,
  getNotesMedicalRecordByPatientId,
  updateNotesMedicalRecord,
} from "./Controllers/notesMedicalRecordController.js";
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

//----Funcionários----
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

//----Marcar Consultas----
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

//----Horários disponíveis para marcar consultas----
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

//----Cronograma de trabalho----
router.post(
  "/cronograma-trabalho",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  createWorkSchedule
);

router.get("/cronograma-trabalho", authMiddleware, getAllWorkSchedules);

router.get("/cronograma-trabalho/:id", authMiddleware, getWorkScheduleById);

router.patch(
  "/cronograma-trabalho/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  updateWorkSchedule
);

router.delete(
  "/cronograma-trabalho/:id",
  authMiddleware,
  authorizeSelfOrAdmin("admin"),
  deleteWorkSchedule
);

//----Sinais vitais do paciente----
router.post(
  "/sinais-vitais",
  authMiddleware,
  authorizeAppointmentAccess(),
  createVitalSign
);

router.get(
  "/sinais-vitais",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllVitalSigns
);

router.get(
  "/sinais-vitais/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getVitalSignsByPatientId
);

router.patch(
  "/sinais-vitais/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateVitalSign
);

//----Histórico Médico----
router.post(
  "/historico-medico",
  authMiddleware,
  authorizeAppointmentAccess(),
  createMedicalHistory
);

router.get(
  "/historico-medico",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllMedicalHistory
);

router.get(
  "/historico-medico/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getMedicalHistoryByPatientId
);

router.patch(
  "/historico-medico/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateMedicalHistory
);

router.delete(
  "/historico-medico/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  deleteMedicalHistory
);

//----Anotações Médicas----
router.post(
  "/anotacoes-medicas",
  authMiddleware,
  authorizeAppointmentAccess(),
  createNotesMedicalRecord
);

router.get(
  "/anotacoes-medicas",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllNotesMedicalRecord
);

router.get(
  "/anotacoes-medicas/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getNotesMedicalRecordByPatientId
);

router.patch(
  "/anotacoes-medicas/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateNotesMedicalRecord
);

router.delete(
  "/anotacoes-medicas/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  deleteNotesMedicalRecord
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
