import employeeAuthService from "../Service/employeeAuthService";

export const registerEmployee = async (req, res, next) => {
  try {
    const data = await employeeAuthService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const loginEmployee = async (req, res, next) => {
  try {
    const data = await employeeAuthService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
