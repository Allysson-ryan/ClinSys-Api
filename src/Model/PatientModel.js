import mongoose from "mongoose";

const PacientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cpf: {
      type: Number,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Pacient = mongoose.model("Pacient", PacientSchema);
