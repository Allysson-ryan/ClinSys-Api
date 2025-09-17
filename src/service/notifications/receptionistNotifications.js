import dayjs from "dayjs";

export const ReceptionistNotificationTypes = Object.freeze({
  APPOINTMENT_CONFIRMED: "APPOINTMENT_CONFIRMED",
  APPOINTMENT_CANCELED: "APPOINTMENT_CANCELED",
  APPOINTMENT_RESCHEDULED: "APPOINTMENT_RESCHEDULED",
  APPOINTMENT_FINISHED: "APPOINTMENT_FINISHED",
  VACCINE_FINISHED: "VACCINE_FINISHED",
  PAYMENT_MADE: "PAYMENT_MADE",
  EXAM_DELIVERED: "EXAM_DELIVERED",
  EXAM_READY_FOR_PICKUP: "EXAM_READY_FOR_PICKUP",
  CHAT_NEW_MESSAGE: "CHAT_NEW_MESSAGE",
  PROFESSIONAL_ABSENCE: "PROFESSIONAL_ABSENCE",
  WORK_SCHEDULE_ADDED: "WORK_SCHEDULE_ADDED",
});

function getLabels({ type, professionalName, patientName, date, time }) {
  const formattedDate = dayjs(date).format("DD/MM/YYYY");

  if (type === "vacina") {
    return {
      confirmed: {
        title: "Novo agendamento confirmado",
        subtitle: `A Vacinação de ${patientName} com o(a) Enfermeiro(a) ${professionalName} no dia ${formattedDate} foi confirmada.`,
        icon: "reception-vaccine-confirmed",
      },
      canceled: {
        title: "Vacinação cancelada",
        subtitle: `A vacinação de ${patientName} com o(a) Enfermeiro(a) ${professionalName} do dia ${formattedDate} foi cancelada pelo paciente.`,
        icon: "reception-vaccine-canceled",
      },
      rescheduled: {
        title: "Vacinação reagendada",
        subtitle: `Vacinação de ${patientName} com o(a) Enfermeiro(a) ${professionalName} foi remarcada para ${formattedDate} às ${time}.`,
        icon: "reception-vaccine-rescheduled",
      },
    };
  }

  return {
    confirmed: {
      title: "Novo agendamento confirmado",
      subtitle: `A Consulta de ${patientName} com o(a) Dr(a) ${professionalName} no dia ${formattedDate} foi confirmada.`,
      icon: "reception-appointment-confirmed",
    },
    canceled: {
      title: "Consulta cancelada",
      subtitle: `A consulta de ${patientName} com o(a) Dr(a) ${professionalName} do dia ${formattedDate} foi cancelada pelo paciente.`,
      icon: "appointment-canceled",
    },
    rescheduled: {
      title: "Consulta reagendada",
      subtitle: `Consulta de ${patientName} com o(a) Dr(a) ${professionalName} foi remarcada para ${formattedDate} às ${time}.`,
      icon: "schedule-changed",
    },
  };
}

export const receptionistNotifications = {
  [ReceptionistNotificationTypes.APPOINTMENT_CONFIRMED]: (payload = {}) => {
    const labels = getLabels(payload);
    return labels.confirmed;
  },

  [ReceptionistNotificationTypes.APPOINTMENT_CANCELED]: (payload = {}) => {
    const labels = getLabels(payload);
    return labels.canceled;
  },

  [ReceptionistNotificationTypes.APPOINTMENT_RESCHEDULED]: (payload = {}) => {
    const labels = getLabels(payload);
    return labels.rescheduled;
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
      subtitle: `${professionalName} está ausente hoje (${start}–${end}). Consultas do período serão canceladas automaticamente.`,
      icon: "reception-absence",
    };
  },

  [ReceptionistNotificationTypes.WORK_SCHEDULE_ADDED]: (payload = {}) => {
    const { workday, startTime, endTime } = payload;

    const formattedDate = dayjs(workday).format("DD/MM/YYYY");

    return {
      title: "Horário de trabalho adicionado",
      subtitle: `O admin definiu seu horário de trabalho - dia ${formattedDate}, das ${startTime} até ${endTime}.`,
      icon: "work-schedule",
    };
  },

  [ReceptionistNotificationTypes.PAYMENT_MADE]: (payload = {}) => {
    const { type, pacientName, professionalName, price } = payload;

    if (type === "consulta") {
      return {
        title: "Pagamanto Realizado",
        subtitle: `Consulta do paciente ${pacientName} com Dr(a). ${professionalName} foi realizado o pagamento - valor: ${price}.`,
        icon: "price-consultation",
      };
    }

    if (type === "vacina") {
      return {
        title: "Pagamanto Realizado",
        subtitle: `Vacinação do paciente ${pacientName} com Enfermeiro(a). ${professionalName} foi realizado o pagamento - valor: ${price}.`,
        icon: "price-consultation",
      };
    }
  },

  [ReceptionistNotificationTypes.APPOINTMENT_FINISHED]: (payload = {}) => {
    const { patientName, professionalName } = payload;
    return {
      title: "Consulta finalizada",
      subtitle: `A consulta de ${patientName} com o(a) Dr(a). ${professionalName} foi finalizada.`,
      icon: "appointment-finished",
    };
  },

  [ReceptionistNotificationTypes.VACCINE_FINISHED]: (payload = {}) => {
    const { patientName, professionalName } = payload;
    return {
      title: "Vacinação finalizada",
      subtitle: `A vacinação de ${patientName} com o(a) Enfermeiro(a). ${professionalName} foi finalizada.`,
      icon: "vaccine-finished",
    };
  },
};
