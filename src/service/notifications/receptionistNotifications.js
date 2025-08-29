import dayjs from "dayjs";

export const ReceptionistNotificationTypes = Object.freeze({
  APPOINTMENT_CONFIRMED: "APPOINTMENT_CONFIRMED",
  APPOINTMENT_CANCELED: "APPOINTMENT_CANCELED",
  APPOINTMENT_RESCHEDULED: "APPOINTMENT_RESCHEDULED",
  EXAM_DELIVERED: "EXAM_DELIVERED",
  EXAM_READY_FOR_PICKUP: "EXAM_READY_FOR_PICKUP",
  CHAT_NEW_MESSAGE: "CHAT_NEW_MESSAGE",
  PROFESSIONAL_ABSENCE: "PROFESSIONAL_ABSENCE",
  PRICE_UPDATE: "PRICE_UPDATE",
  WORK_SCHEDULE_ADDED: "WORK_SCHEDULE_ADDED",
});

export const receptionistNotifications = {
  [ReceptionistNotificationTypes.APPOINTMENT_CONFIRMED]: (payload = {}) => {
    const { doctorName, patientName, date } = payload;

    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return {
      title: "Novo agendamento confirmado",
      subtitle: `A Consulta de ${patientName} com o(a) Dr(a) ${doctorName} no dia ${formattedDate} foi confirmada.`,
      icon: "reception-appointment-confirmed",
    };
  },

  [ReceptionistNotificationTypes.APPOINTMENT_CANCELED]: (payload = {}) => {
    const { patientName, doctorName, date } = payload;

    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return {
      title: "Consulta cancelada",
      subtitle: `A consulta de ${patientName} com o(a) Dr(a) ${doctorName} do dia ${formattedDate} foi cancelada pelo paciente.`,
      icon: "reception-appointment-canceled",
    };
  },

  [ReceptionistNotificationTypes.APPOINTMENT_RESCHEDULED]: (payload = {}) => {
    const { patientName, doctorName, date, time } = payload;

    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return {
      title: "Consulta reagendada",
      subtitle: `Consulta de ${patientName} com o(a) Dr(a) ${doctorName} foi remarcada para ${formattedDate} às ${time}.`,
      icon: "reception-appointment-rescheduled",
    };
  },

  [ReceptionistNotificationTypes.EXAM_DELIVERED]: (payload = {}) => {
    const { examName, patientName } = payload;
    return {
      title: "Exame entregue",
      subtitle: `${examName} de ${patientName} foi entregue ao paciente – status atualizado.`,
      icon: "reception-exam-delivered",
    };
  },

  [ReceptionistNotificationTypes.EXAM_READY_FOR_PICKUP]: (payload = {}) => {
    const { examName, patientName } = payload;
    return {
      title: "Novo exame disponível para retirada",
      subtitle: `${examName} da paciente ${patientName} está pronto para entrega.`,
      icon: "reception-exam-ready",
    };
  },

  [ReceptionistNotificationTypes.CHAT_NEW_MESSAGE]: (payload = {}) => {
    const { fromName } = payload;
    return {
      title: "Nova mensagem no chat",
      subtitle: `Você recebeu uma nova mensagem de ${fromName}.`,
      icon: "reception-chat-new",
    };
  },

  [ReceptionistNotificationTypes.PROFESSIONAL_ABSENCE]: (payload = {}) => {
    const { professionalName, start, end } = payload;
    return {
      title: "Ausência de profissional",
      subtitle: `${professionalName} está ausente hoje – reagendar consultas das ${start} às ${end}.`,
      icon: "reception-absence",
    };
  },

  [ReceptionistNotificationTypes.PRICE_UPDATE]: (payload = {}) => {
    const { professionalName, newPrice } = payload;
    return {
      title: "Atualização de valores",
      subtitle: `Consulta com ${professionalName} agora custa R$ ${newPrice} – valores atualizados no sistema.`,
      icon: "reception-price-update",
    };
  },

  [ReceptionistNotificationTypes.WORK_SCHEDULE_ADDED]: () => {
    return {
      title: "Horário de trabalho adicionado",
      subtitle: "O admin definiu seu horário de trabalho.",
      icon: "reception-work-schedule",
    };
  },
};
