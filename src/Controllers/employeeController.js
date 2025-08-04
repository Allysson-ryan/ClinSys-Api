import employeeAuthService from "../service/employeeService.js";

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

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeAuthService.getAll();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeAuthService.getById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const updated = await employeeAuthService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await employeeAuthService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
