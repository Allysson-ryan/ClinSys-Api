import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Employee } from "../Model/EmployeeModel.js";
import mongoose from "mongoose";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default {
  async register({
    name,
    email,
    password,
    role,
    position,
    crmNumber,
    corenNumber,
    status,
  }) {
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) throw new Error("Funcionário já cadastrado.");

    if (crmNumber && crmNumber.trim() !== "") {
      const crmExists = await Employee.findOne({ crmNumber });
      if (crmExists) throw new Error("CRM já cadastrado.");
    }

    if (corenNumber && corenNumber.trim() !== "") {
      const corenExists = await Employee.findOne({ corenNumber });
      if (corenExists) throw new Error("Coren já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role,
      position,
      crmNumber: crmNumber || null,
      corenNumber: corenNumber || null,
      status,
    });

    return {
      employee: {
        id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
        position: newEmployee.position,
        status: newEmployee.status,
      },
    };
  },

  async login({ email, password }) {
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) throw new Error("Funcionário não encontrado.");

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) throw new Error("Senha incorreta.");

    const token = generateToken(employee._id, employee.role);

    return {
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        position: employee.position,
        status: employee.status,
      },
      token,
    };
  },

  async getAll() {
    const employees = await Employee.find().select("-password");
    return employees;
  },

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID inválido.");
    const employee = await Employee.findById(id).select("-password");
    if (!employee) throw new Error("Funcionário não encontrado.");
    return employee;
  },

  async update(id, updates) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID inválido.");
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updated = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updated) throw new Error("Funcionário não encontrado.");
    return updated;
  },

  async remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("ID inválido.");
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) throw new Error("Funcionário não encontrado.");
  },
};
