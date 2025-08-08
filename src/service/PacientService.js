import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Pacient } from "../Model/PatientModel.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default {
  async create(data) {
    const { name, email, cpf, birthDate, password, priority, role } = data;

    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = await Pacient.findOne({ email: normalizedEmail });
    if (emailExists) {
      throw new AppError("Paciente já cadastrado com esse e-mail.", 400);
    }

    const cpfExists = await Pacient.findOne({ cpf: cpf.trim() });
    if (cpfExists) {
      throw new AppError("Paciente já cadastrado com esse CPF.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pacient = await Pacient.create({
      name,
      email: normalizedEmail,
      cpf: cpf.trim(),
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
    const normalizedEmail = email.trim().toLowerCase();

    const pacient = await Pacient.findOne({ email: normalizedEmail }).select(
      "+password"
    );
    if (!pacient) {
      throw new AppError("Paciente não encontrado.", 404);
    }

    const passwordMatch = await bcrypt.compare(password, pacient.password);
    if (!passwordMatch) {
      throw new AppError("Senha incorreta.", 401);
    }

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
