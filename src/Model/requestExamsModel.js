import mongoose from "mongoose";

const requestExameSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pacient",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    examType: {
      type: String,
      default: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const requestExame = mongoose.model("requestExame", requestExameSchema);
export default requestExame;
