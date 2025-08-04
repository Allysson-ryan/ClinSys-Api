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
