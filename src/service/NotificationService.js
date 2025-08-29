import Notification from "../Model/NotificacionModel.js";
import { doctorNotifications } from "./notifications/doctorNotifications.js";
import { receptionistNotifications } from "./notifications/receptionistNotifications.js";
import { Pacient } from "../Model/PatientModel.js";

const notificationCatalog = {
  doctor: doctorNotifications,
  receptionist: receptionistNotifications,
};

async function resolvePatientName(payload) {
  if (payload && typeof payload === "object" && payload.patientName) {
    return payload.patientName;
  }
  if (payload && typeof payload === "object" && payload.patient) {
    const p = await Pacient.findById(payload.patient).select("name").lean();
    return p?.name || null;
  }
  return null;
}

/**
 * @param {'doctor'|'receptionist'|'nurse'|'patient'|'lab'|'imaging'} sector
 * @param {string} type
 * @param {string} recipientId
 * @param {'Employee'|'Pacient'} recipientModel
 * @param {object} payload
 */
export const createNotification = async (
  sector,
  type,
  recipientId,
  recipientModel,
  payload = {}
) => {
  const catalog = notificationCatalog[sector];
  if (!catalog) throw new Error(`Setor ${sector} não suportado`);

  const templateFn = catalog[type];
  if (!templateFn)
    throw new Error(`Tipo ${type} não existe no setor ${sector}`);

  const patientName = await resolvePatientName(payload);

  const safePayload = {
    ...payload,
    ...(patientName ? { patientName } : {}),
  };

  const { title, subtitle, icon } = templateFn(safePayload);

  return Notification.create({
    sector,
    type,
    title,
    subtitle,
    icon,
    isRead: false,
    recipient: recipientId,
    recipientModel,
  });
};

export const getNotifications = async (recipientId) => {
  return Notification.find({ recipient: recipientId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId, recipientId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, recipient: recipientId },
    { isRead: true },
    { new: true }
  );
};
