import dayjs from "dayjs";

export const laboratoryNotificationTypes = Object.freeze({
  EXAM_REQUESTED: "EXAM_REQUESTED",
  EXAM_SUBMITTED: "EXAM_SUBMITTED",
  CHAT_NEW_MESSAGE: "CHAT_NEW_MESSAGE",
  WORK_SCHEDULE_ADDED: "WORK_SCHEDULE_ADDED",
});

export const laboratoryNotifications = {
  [laboratoryNotificationTypes.EXAM_REQUESTED]: (payload = {}) => {
    const { doctorName, examName, patientName } = payload;
    return {
      title: "Exame solicitado pelo médico",
      subtitle: `${doctorName} solicitou exame de ${examName} para paciente ${patientName}.`,
      icon: "exam-requested",
    };
  },

  [laboratoryNotificationTypes.EXAM_SUBMITTED]: (payload = {}) => {
    const { examType, patientName } = payload;
    return {
      title: "Exame entregue",
      subtitle: `${examType} do paciente ${patientName} foi finalizado.`,
      icon: "laboratory-exam-submitted",
    };
  },

  [laboratoryNotificationTypes.CHAT_NEW_MESSAGE]: (payload = {}) => {
    const { fromName } = payload;
    return {
      title: "Nova mensagem no chat",
      subtitle: `Você recebeu uma nova mensagem de ${fromName}.`,
      icon: "chat-new",
    };
  },

  [laboratoryNotificationTypes.WORK_SCHEDULE_ADDED]: (payload = {}) => {
    const { workday, startTime, endTime } = payload;

    const formattedDate = dayjs(workday).format("DD/MM/YYYY");

    return {
      title: "Horário de trabalho adicionado",
      subtitle: `O admin definiu seu horário de trabalho - dia ${formattedDate}, das ${startTime} até ${endTime}.`,
      icon: "work-schedule",
    };
  },
};
