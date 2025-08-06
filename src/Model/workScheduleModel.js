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
    },
    horaInicio: {
      type: String,
      required: true,
    },
    horaFim: {
      type: String,
      required: true,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WorkSchedule = mongoose.model("WorkSchedule", workScheduleSchema);
