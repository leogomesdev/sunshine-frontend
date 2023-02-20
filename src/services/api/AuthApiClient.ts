import axios from "axios";
import AppConfig from "../../configs/AppConfig";
import ILoginResponse from "../interfaces/ILoginResponse";
import IRegisterResponse from "../interfaces/IRegisterResponse";

export const loginRequest = (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  return axios.post(`${AppConfig.backendUrl}/auth/login`, {
    email,
    password,
  });
};

export const registerRequest = (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<IRegisterResponse> => {
  return axios.post(`${AppConfig.backendUrl}/auth/register`, {
    name,
    email,
    password,
    passwordConfirmation,
  });
};
