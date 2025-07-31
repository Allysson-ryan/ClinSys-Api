import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Employee } from "../Model/EmployeeModel.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default {
  async register({ name, email, password, role }) {
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) throw new Error("Funcionário já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return {
      employee: {
        id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
      },
    };
  },

  async login({ email, password }) {
    const employee = await Employee.findOne({ email });
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
      },
      token,
    };
  },
};
