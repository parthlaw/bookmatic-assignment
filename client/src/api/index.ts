import axios, { AxiosError } from "axios";
axios.defaults.withCredentials = true;
const BASE_URL = "https://bookmatic-assignment.herokuapp.com";
export const login = async (data: { username: string; password: string }) => {
  try {
    return await axios.post(`${BASE_URL}/user/login`, data);
  } catch (error: Error | AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    return error;
  }
};
export const checkToken = async (token: string) => {
  try {
    return await axios.get(`${BASE_URL}/token/getAuth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: Error | AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    return error;
  }
};
export const register = async (data: {
  username: string;
  password: string;
  name: string;
}) => {
  try {
    return await axios.post(`${BASE_URL}/user/register`, data);
  } catch (error: Error | AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    return error;
  }
};
export const createTransaction = async (
  data: { amount: string; type: string; partyName: string },
  token: string
) => {
  try {
    return await axios.post(`${BASE_URL}/transactions/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: Error | AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    return error;
  }
};
export const getTransactions = async (token: string) => {
  try {
    return await axios.get(`${BASE_URL}/transactions/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: Error | AxiosError | any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response;
      }
    }
    return error;
  }
};
export const logout = async () => {
    try {
        return await axios.get(`${BASE_URL}/user/logout`);
    } catch (error: Error | AxiosError | any) {
        if (axios.isAxiosError(error)) {
        if (error.response) {
            return error.response;
        }
        }
        return error;
    }
}