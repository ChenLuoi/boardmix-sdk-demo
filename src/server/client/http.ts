import axios from "axios";
import { SDK_BASE } from "../../constant";

export const httpInstance = axios.create({
  baseURL: SDK_BASE,
});
