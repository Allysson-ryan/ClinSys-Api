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
  getAppointmentsByDoctorId,
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
  getVitalSignById,
  getVitalSignsByPatientId,
  updateVitalSign,
} from "./Controllers/vitalSignsController.js";
import {
  createMedicalHistory,
  getMedicalHistoryById,
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
import {
  createAllergiesMedicalRecord,
  deleteAllergiesMedicalRecord,
  getAllergiesMedicalRecordByPatientId,
  updateAllergiesMedicalRecord,
} from "./Controllers/allergiesMedicalRecordController.js";
import {
  createMedicalPrescription,
  deleteMedicalPrescription,
  getMedicalPrescriptionById,
  getMedicalPrescriptionByPatientId,
  updateMedicalPrescription,
} from "./Controllers/PrescriptionController.js";
import {
  createRequestExams,
  getAllRequestExams,
  getRequestExamsById,
  getRequestExamsByPatientId,
  markRequestExamsStatusAsCompleted,
} from "./Controllers/requestExamsController.js";
import {
  createThyroidFunction,
  getAllThyroidFunction,
  getThyroidFunctionById,
  getThyroidFunctionByPatientId,
  updateThyroidFunction,
} from "./Controllers/ThyroidFunctionController.js";
import {
  createCompleteBloodExame,
  getAllCompleteBloodExame,
  getCompleteBloodExameById,
  getCompleteBloodExameByPatientId,
  updateCompleteBloodExame,
} from "./Controllers/CompleteBloodExameController.js";
import {
  createFastingGlucose,
  getAllFastingGlucose,
  getFastingGlucoseById,
  getFastingGlucoseByPatientId,
  updateFastingGlucose,
} from "./Controllers/FastingGlucoseController.js";
import {
  createMessage,
  getContacts,
  getConversation,
  updateMessage,
  deleteMessage,
  getAvailableContacts,
} from "./Controllers/ChatMessageController.js";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "./Controllers/NotificationController.js";
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

router.get(
  "/appointments/doctor/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAppointmentsByDoctorId
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
  "/sinais-vitais/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getVitalSignById
);

router.get(
  "/sinais-vitais/paciente/:id",
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
  "/historico-medico/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getMedicalHistoryById
);

router.get(
  "/historico-medico/paciente/:id",
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

//----Alergias----
router.post(
  "/alergias",
  authMiddleware,
  authorizeAppointmentAccess(),
  createAllergiesMedicalRecord
);

router.get(
  "/alergias/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllergiesMedicalRecordByPatientId
);

router.patch(
  "/alergias/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateAllergiesMedicalRecord
);

router.delete(
  "/alergias/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  deleteAllergiesMedicalRecord
);

//----Prescrição Médica----
router.post(
  "/prescricao",
  authMiddleware,
  authorizeAppointmentAccess(),
  createMedicalPrescription
);

router.get(
  "/prescricao/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getMedicalPrescriptionById
);

router.get(
  "/prescricao/paciente/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getMedicalPrescriptionByPatientId
);

router.patch(
  "/prescricao/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateMedicalPrescription
);

router.delete(
  "/prescricao/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  deleteMedicalPrescription
);

//----Solicitação de exames----
router.post(
  "/exame-glicose",
  authMiddleware,
  authorizeAppointmentAccess(),
  createRequestExams
);

router.get(
  "/solicitar-exame",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllRequestExams
);

router.get(
  "/solicitar-exame/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getRequestExamsById
);

router.get(
  "/solicitar-exame/paciente/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getRequestExamsByPatientId
);

router.patch(
  "/solicitar-exame/:id/finalizado",
  authMiddleware,
  authorizeAppointmentAccess(),
  markRequestExamsStatusAsCompleted
);

//----Exame de tireoide----
router.post(
  "/exame-tireoide",
  authMiddleware,
  authorizeAppointmentAccess(),
  createThyroidFunction
);

router.get(
  "/exame-tireoide",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllThyroidFunction
);

router.get(
  "/exame-tireoide/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getThyroidFunctionById
);

router.get(
  "/exame-tireoide/paciente/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getThyroidFunctionByPatientId
);

router.patch(
  "/exame-tireoide/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateThyroidFunction
);

//----Exame de sangue completo----
router.post(
  "/exame-sangue",
  authMiddleware,
  authorizeAppointmentAccess(),
  createCompleteBloodExame
);

router.get(
  "/exame-sangue",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllCompleteBloodExame
);

router.get(
  "/exame-sangue/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getCompleteBloodExameById
);

router.get(
  "/exame-sangue/paciente/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getCompleteBloodExameByPatientId
);

router.patch(
  "/exame-sangue/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateCompleteBloodExame
);

//----Exame de glicose----
router.post(
  "/exame-glicose",
  authMiddleware,
  authorizeAppointmentAccess(),
  createFastingGlucose
);

router.get(
  "/exame-glicose",
  authMiddleware,
  authorizeAppointmentAccess(),
  getAllFastingGlucose
);

router.get(
  "/exame-glicose/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getFastingGlucoseById
);

router.get(
  "/exame-glicose/paciente/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  getFastingGlucoseByPatientId
);

router.patch(
  "/exame-glicose/:id",
  authMiddleware,
  authorizeAppointmentAccess(),
  updateFastingGlucose
);

//----Chat----
router.post("/chat/messages", authMiddleware, createMessage);

router.get("/chat/contacts", authMiddleware, getContacts);

router.get("/chat/available-contacts", authMiddleware, getAvailableContacts);

router.get("/chat/conversation/:otherId", authMiddleware, getConversation);

router.patch("/chat/messages/:id", authMiddleware, updateMessage);

router.delete("/chat/messages/:id", authMiddleware, deleteMessage);

//----Notificações----
router.get("/notifications", authMiddleware, getUserNotifications);

router.patch("/notifications/:id/read", authMiddleware, markNotificationAsRead);

export default router;
