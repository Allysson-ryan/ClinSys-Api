import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../Model/AdminModel.js";

const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET não configurado.");
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default {
  async registerAdmin({ name, email, password }) {
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

  async loginAdmin({ email, password }) {
    const admin = await Admin.findOne({ email }).select("+password");
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

  async findAll() {
    return await Admin.find();
  },

  async updateAdmin(id, data) {
    const updates = { ...data };

    if (data.password) {
      updates.password = await bcrypt.hash(data.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    return updatedAdmin;
  },

  async deleteAdmin(id) {
    const deleted = await Admin.findByIdAndDelete(id);
    return deleted;
  },
};
