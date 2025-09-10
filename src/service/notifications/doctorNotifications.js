import dayjs from "dayjs";

export const DoctorNotificationTypes = Object.freeze({
  EXAM_REQUESTED: "EXAM_REQUESTED",
  EXAM_RESULT_AVAILABLE: "EXAM_RESULT_AVAILABLE",
  APPOINTMENT_CANCELED: "APPOINTMENT_CANCELED",
  APPOINTMENT_NO_SHOW: "APPOINTMENT_NO_SHOW",
  APPOINTMENT_REMINDER: "APPOINTMENT_REMINDER",
  CHAT_NEW_MESSAGE: "CHAT_NEW_MESSAGE",
  NEW_PATIENT_TODAY: "NEW_PATIENT_TODAY",
  SCHEDULE_CHANGED: "SCHEDULE_CHANGED",
  WORK_SCHEDULE_ADDED: "WORK_SCHEDULE_ADDED",
});

export const doctorNotifications = {
  [DoctorNotificationTypes.EXAM_REQUESTED]: (payload = {}) => {
    const { examName, patientName } = payload;
    return {
      title: "Novo exame solicitado",
      subtitle: `${examName} para ${patientName} foi solicitado com sucesso.`,
      icon: "exam-requested",
    };
  },

  [DoctorNotificationTypes.EXAM_RESULT_AVAILABLE]: (payload = {}) => {
    const { examType, patientName } = payload;
    return {
      title: "Resultado de exame disponível",
      subtitle: `Resultado do exame de ${examType} do paciente ${patientName} está disponível.`,
      icon: "doctor-exam-result",
    };
  },

  [DoctorNotificationTypes.APPOINTMENT_CANCELED]: (payload = {}) => {
    const { patientName } = payload;
    return {
      title: "Consulta cancelada",
      subtitle: `Consulta de ${patientName} foi cancelada pelo paciente.`,
      icon: "appointment-canceled",
    };
  },

  [DoctorNotificationTypes.APPOINTMENT_NO_SHOW]: (payload = {}) => {
    const { patientName } = payload;
    return {
      title: "Paciente ausente",
      subtitle: `Paciente ${patientName} não compareceu a consulta.`,
      icon: "doctor-appointment-canceled",
    };
  },

  [DoctorNotificationTypes.CHAT_NEW_MESSAGE]: (payload = {}) => {
    const { fromName } = payload;
    return {
      title: "Nova mensagem no chat",
      subtitle: `Você recebeu uma nova mensagem de ${fromName}.`,
      icon: "doctor-chat-new",
    };
  },

  [DoctorNotificationTypes.NEW_PATIENT_TODAY]: (payload = {}) => {
    const { patientName, time } = payload;
    return {
      title: "Novo paciente no dia",
      subtitle: `Paciente ${patientName} foi adicionado à sua lista de atendimentos para hoje – ${time}.`,
      icon: "doctor-new-patient",
    };
  },

  [DoctorNotificationTypes.SCHEDULE_CHANGED]: (payload = {}) => {
    const { patientName, date, time } = payload;

    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return {
      title: "Alteração na agenda",
      subtitle: `Consulta de ${patientName} foi remarcada para ${formattedDate} às ${time}.`,
      icon: "schedule-changed",
    };
  },

  [DoctorNotificationTypes.WORK_SCHEDULE_ADDED]: () => {
    return {
      title: "Horário de trabalho adicionado",
      subtitle: "O admin definiu seu horário de trabalho.",
      icon: "work-schedule",
    };
  },
};
