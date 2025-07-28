import AuthService from "../services/authService.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  try {
    const data = await AuthService.registerUser(req.body);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await AuthService.loginUser(req.body);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const registerPacient = async (req, res, next) => {
  try {
    const data = await AuthService.registerPacient(req.body);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const loginPacient = async (req, res, next) => {
  try {
    const data = await AuthService.loginPacient(req.body);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
