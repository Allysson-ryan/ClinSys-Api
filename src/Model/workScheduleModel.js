import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema(
  {
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    diaSemana: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    horaInicio: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    horaFim: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    status: {
      type: String,
      enum: ["Presente", "Ausente"],
      default: "Presente",
    },
    absenceReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const WorkSchedule = mongoose.model("WorkSchedule", workScheduleSchema);
