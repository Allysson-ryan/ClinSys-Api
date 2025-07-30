import adminAuthService from "../Service/adminAuthService";

export const registerAdmin = async (req, res, next) => {
  try {
    const data = await adminAuthService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const data = await adminAuthService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
