import axios from "axios";
import { SDK_SERVER_API_BASE } from "../../constant";

export const httpInstance = axios.create({
  baseURL: SDK_SERVER_API_BASE,
});
