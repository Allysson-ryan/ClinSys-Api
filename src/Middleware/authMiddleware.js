import jwt from "jsonwebtoken";
import { Admin } from "../Model/AdminModel.js";
import { Employee } from "../Model/EmployeeModel.js";
import { Pacient } from "../Model/PatientModel.js";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [admin, employee, pacient] = await Promise.all([
      Admin.findById(decoded.id),
      Employee.findById(decoded.id),
      Pacient.findById(decoded.id),
    ]);

    const user = admin || employee || pacient;

    if (!user) {
      return res.status(403).json({ error: "Usuário não encontrado." });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      role: user.role,
      type: admin ? "admin" : employee ? "employee" : "pacient",
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
}
