import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/AdminModel.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default {
  async register({ name, email, password }) {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) throw new Error("Admin já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return {
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    };
  },

  async login({ email, password }) {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Admin não encontrado.");

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new Error("Senha incorreta.");

    const token = generateToken(admin._id, admin.role);

    return {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    };
  },
};
