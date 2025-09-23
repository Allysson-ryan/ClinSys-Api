import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
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
    role: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    crmNumber: {
      type: String,
    },
    corenNumber: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "Não aceito",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
