import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema(
  {
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    diaSemana: {
      type: Date,
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
