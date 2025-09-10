import dayjs from "dayjs";

export const nursingNotificationTypes = Object.freeze({
  EXAM_REQUESTED: "EXAM_REQUESTED",
  APPOINTMENT_CANCELED: "APPOINTMENT_CANCELED",
  APPOINTMENT_NO_SHOW: "APPOINTMENT_NO_SHOW",
  APPOINTMENT_RESCHEDULED: "APPOINTMENT_RESCHEDULED",
  CHAT_NEW_MESSAGE: "CHAT_NEW_MESSAGE",
  NEW_PATIENT_TODAY: "NEW_PATIENT_TODAY",
  SCHEDULE_CHANGED: "SCHEDULE_CHANGED",
  WORK_SCHEDULE_ADDED: "WORK_SCHEDULE_ADDED",
});

export const nursingNotifications = {
  [nursingNotificationTypes.EXAM_REQUESTED]: (payload = {}) => {
    const { doctorName, examName, patientName } = payload;
    return {
      title: "Exame solicitado pelo médico",
      subtitle: `${doctorName} solicitou exame de ${examName} para paciente ${patientName} – providenciar coleta.`,
      icon: "exam-requested",
    };
  },

  [nursingNotificationTypes.APPOINTMENT_CANCELED]: (payload = {}) => {
    const { patientName } = payload;
    return {
      title: "Vacinação cancelada",
      subtitle: `Vacinação de ${patientName} foi cancelada pelo paciente.`,
      icon: "nursing-appointment-canceled",
    };
  },

  [nursingNotificationTypes.APPOINTMENT_NO_SHOW]: (payload = {}) => {
    const { patientName } = payload;
    return {
      title: "Paciente ausente",
      subtitle: `Paciente ${patientName} não compareceu a vacinação.`,
      icon: "nursing-appointment-canceled",
    };
  },

  [nursingNotificationTypes.NEW_PATIENT_TODAY]: (payload = {}) => {
    const { patientName, time } = payload;
    return {
      title: "Novo paciente no dia",
      subtitle: `Paciente ${patientName} foi adicionado à sua lista de atendimentos para hoje – ${time}.`,
      icon: "nursing-new-patient",
    };
  },

  [nursingNotificationTypes.SCHEDULE_CHANGED]: (payload = {}) => {
    const { patientName, date, time } = payload;

    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return {
      title: "Alteração na agenda",
      subtitle: `Vacinação de ${patientName} foi remarcada para ${formattedDate} às ${time}.`,
      icon: "nursing-schedule-changed",
    };
  },

  [nursingNotificationTypes.CHAT_NEW_MESSAGE]: (payload = {}) => {
    const { fromName } = payload;
    return {
      title: "Nova mensagem no chat",
      subtitle: `Você recebeu uma nova mensagem de ${fromName}.`,
      icon: "chat-new",
    };
  },

  [nursingNotificationTypes.WORK_SCHEDULE_ADDED]: () => {
    return {
      title: "Horário de trabalho adicionado",
      subtitle: "O admin definiu seu horário de trabalho.",
      icon: "work-schedule",
    };
  },
};
