import * as ChatMessageService from "../service/ChatMessageService.js";
import { createNotification } from "../service/NotificationService.js";
import { DoctorNotificationTypes } from "../service/notifications/doctorNotifications.js";

export const createMessage = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const message = await ChatMessageService.createMessage({
      ...req.body,
      sender: employeeId,
    });

    await createNotification(
      "doctor",
      DoctorNotificationTypes.CHAT_NEW_MESSAGE,
      message.sender,
      "Employee",
      {
        fromName: message.receiver.name,
      }
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const contacts = await ChatMessageService.getContactsByEmployee(employeeId);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailableContacts = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const contacts = await ChatMessageService.getAvailableContacts(employeeId);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const { otherId } = req.params;
    const messages = await ChatMessageService.getConversation(
      employeeId,
      otherId
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const { id: messageId } = req.params;
    const updated = await ChatMessageService.updateMessage(
      messageId,
      req.body,
      employeeId
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: employeeId } = req.user;
    const { id: messageId } = req.params;
    const deleted = await ChatMessageService.deleteMessage(
      messageId,
      employeeId
    );
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
