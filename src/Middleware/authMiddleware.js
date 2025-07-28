const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token não fornecido ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.isActive === false) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    req.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
