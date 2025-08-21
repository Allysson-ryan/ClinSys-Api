import ChatMessage from "../Model/ChatMessageModel.js";
import { Employee } from "../Model/EmployeeModel.js";
import mongoose from "mongoose";

export const createMessage = async (data) => {
  const newMessage = await ChatMessage.create(data);
  return newMessage
    .populate("sender", "name role")
    .populate("receiver", "name role");
};

export const getContactsByEmployee = async (employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new Error("ID inválido");
  }

  const messages = await ChatMessage.find({
    $or: [{ sender: employeeId }, { receiver: employeeId }],
  });

  const contactIds = [
    ...new Set(
      messages.map((msg) =>
        msg.sender.toString() === employeeId.toString()
          ? msg.receiver.toString()
          : msg.sender.toString()
      )
    ),
  ];

  return await Employee.find({ _id: { $in: contactIds } }).select(
    "name role position"
  );
};

export const getAvailableContacts = async (employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new Error("ID inválido");
  }

  const messages = await ChatMessage.find({
    $or: [{ sender: employeeId }, { receiver: employeeId }],
  });

  const usedContactIds = [
    ...new Set(
      messages.map((msg) =>
        msg.sender.toString() === employeeId.toString()
          ? msg.receiver.toString()
          : msg.sender.toString()
      )
    ),
  ];

  return await Employee.find({
    _id: { $nin: [...usedContactIds, employeeId] },
  }).select("name role position");
};

export const getConversation = async (employeeId, otherId) => {
  if (
    !mongoose.Types.ObjectId.isValid(employeeId) ||
    !mongoose.Types.ObjectId.isValid(otherId)
  ) {
    throw new Error("ID inválido");
  }

  return await ChatMessage.find({
    $or: [
      { sender: employeeId, receiver: otherId },
      { sender: otherId, receiver: employeeId },
    ],
  })
    .populate("sender", "name role")
    .populate("receiver", "name role")
    .sort({ createdAt: 1 });
};

export const updateMessage = async (messageId, data, employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    throw new Error("ID inválido");
  }

  const message = await ChatMessage.findOneAndUpdate(
    { _id: messageId, sender: employeeId },
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!message)
    throw new Error("Mensagem não encontrada ou você não é o remetente");

  return message;
};

export const deleteMessage = async (messageId, employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    throw new Error("ID inválido");
  }

  const message = await ChatMessage.findOneAndDelete({
    _id: messageId,
    sender: employeeId,
  });

  if (!message)
    throw new Error("Mensagem não encontrada ou você não é o remetente");

  return message;
};
