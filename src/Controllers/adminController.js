import adminService from "../service/adminService.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const data = await adminService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const data = await adminService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
