import axios from "axios";

const api = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
  headers: {
    "Content-Type": "application/json",
  },
});

// helper to set token later.....
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["token"] = token;
};

export default api;
