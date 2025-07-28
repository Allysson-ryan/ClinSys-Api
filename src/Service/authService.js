import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { Pacient } from "../models/PacientModel.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const AuthService = {
  async registerUser({
    name,
    email,
    password,
    role,
    state,
    crmNumber,
    corenNumber,
  }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Usuário já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      state,
      crmNumber,
      corenNumber,
    });

    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },

  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Usuário não encontrado.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta.");

    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },

  async registerPacient({ name, email, cpf, birthDate, priority }) {
    const existing = await Pacient.findOne({ email });
    if (existing) throw new Error("Paciente já cadastrado.");

    const pacient = await Pacient.create({
      name,
      email,
      cpf,
      birthDate,
      priority,
    });

    return {
      pacient: { id: pacient._id, name: pacient.name, email: pacient.email },
    };
  },

  async loginPacient({ email, cpf }) {
    const pacient = await Pacient.findOne({ email, cpf });
    if (!pacient) throw new Error("Paciente não encontrado.");

    const token = generateToken(pacient._id, "paciente");

    return {
      pacient: { id: pacient._id, name: pacient.name, email: pacient.email },
      token,
    };
  },
};

export default AuthService;
