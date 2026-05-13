import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export function imageUrl(personImage) {
  if (!personImage) return "";
  if (personImage.startsWith("http")) return personImage;
  return `${baseURL.replace(/\/$/, "")}/${personImage.replace(/^\//, "")}`;
}
