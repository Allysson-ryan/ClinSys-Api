export function authorizeSelfOrAdmin(targetType) {
  return (req, res, next) => {
    const { id: userId, type } = req.user;
    const targetId = req.params.id;

    const isAdmin = type === "admin";
    const isSameUser = userId === targetId;
    const isSameType = type === targetType;

    if (isAdmin && ["admin", "employee"].includes(targetType)) {
      return next();
    }

    if (isAdmin && targetType === "pacient") {
      return res.status(403).json({
        error: "Admin não tem permissão para esse recurso.",
      });
    }

    if (isSameType && isSameUser) {
      return next();
    }

    return res.status(403).json({ error: "Acesso negado." });
  };
}

export function authorizeAppointmentAccess() {
  return (req, res, next) => {
    const { id: userId, type } = req.user;

    if (type === "employee") return next();

    if (type === "pacient") {
      const pacientId =
        req.method === "GET" ? req.params.id : req.body.pacientName;

      if (pacientId === userId) return next();

      return res.status(403).json({
        error: "Pacientes só podem acessar seus próprias dados.",
      });
    }

    return res.status(403).json({
      error: "Admins não têm permissão para esse recurso.",
    });
  };
}
