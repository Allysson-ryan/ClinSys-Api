import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Pacient } from "../Model/PatientModel.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default {
  async create(data) {
    const { name, email, cpf, birthDate, password, priority, role } = data;

    const existing = await Pacient.findOne({ email });
    if (existing) throw new Error("Paciente já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const pacient = await Pacient.create({
      name,
      email,
      cpf,
      birthDate,
      password: hashedPassword,
      priority,
      role,
    });

    return {
      id: pacient._id,
      name: pacient.name,
      email: pacient.email,
      role: pacient.role,
      priority: pacient.priority,
    };
  },

  async login(email, password) {
    const pacient = await Pacient.findOne({ email }).select("+password");
    if (!pacient) throw new Error("Paciente não encontrado.");

    const passwordMatch = await bcrypt.compare(password, pacient.password);
    if (!passwordMatch) throw new Error("Senha incorreta.");

    const token = generateToken(pacient._id, pacient.role);

    return {
      user: {
        id: pacient._id,
        name: pacient.name,
        email: pacient.email,
        role: pacient.role,
      },
      token,
    };
  },

  async findAll() {
    return await Pacient.find();
  },

  async findById(id) {
    return await Pacient.findById(id);
  },

  async update(id, data) {
    return await Pacient.findByIdAndUpdate(id, data, { new: true });
  },
};
