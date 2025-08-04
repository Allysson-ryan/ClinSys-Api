import adminService from "../service/adminService.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const data = await adminService.registerAdmin(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const data = await adminService.loginAdmin(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAlladmin = async (req, res, next) => {
  try {
    const data = await adminService.findAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const updated = await adminService.updateAdmin(adminId, req.body);
    if (!updated)
      return res.status(404).json({ error: "Admin não encontrado." });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const deleted = await adminService.deleteAdmin(adminId);
    if (!deleted)
      return res.status(404).json({ error: "Admin não encontrado." });

    res.status(200).json({ message: "Admin deletado com sucesso." });
  } catch (error) {
    next(error);
  }
};
