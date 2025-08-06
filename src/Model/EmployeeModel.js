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
    crmNumber: {
      type: String,
      unique: true,
    },
    corenNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      required: true,
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
