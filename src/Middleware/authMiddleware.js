import jwt from "jsonwebtoken";
import { Admin } from "../Model/AdminModel.js";
import { Pacient } from "../Model/PatientModel.js";
import { Employee } from "../Model/EmployeeModel.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token não fornecido ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [admin, pacient, employee] = await Promise.all([
      Admin.findById(decoded.id),
      Pacient.findById(decoded.id),
      Employee.findById(decoded.id),
    ]);

    const user = admin || pacient || employee;

    if (!user) {
      return res
        .status(403)
        .json({ error: "Usuário não encontrado ou acesso negado." });
    }

    req.user = {
      id: user._id,
      name: user.name,
      role: user.role,
      type: admin ? "admin" : pacient ? "pacient" : "employee",
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
