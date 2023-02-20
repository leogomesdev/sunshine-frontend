import axios, { AxiosRequestConfig } from "axios";
import AppConfig from "../../configs/AppConfig";
import ILoginResponse from "../interfaces/ILoginResponse";
import IRegisterResponse from "../interfaces/IRegisterResponse";

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginRequest = (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  const data = {
    email,
    password,
  };
  return axios.post(`${AppConfig.backendUrl}/auth/login`, data, config);
};

export const registerRequest = (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<IRegisterResponse> => {
  const data = {
    name,
    email,
    password,
    passwordConfirmation,
  };
  return axios.post(`${AppConfig.backendUrl}/auth/register`, data, config);
};
