import axios from "axios";
import { SDK_ORIGIN } from "../../constant";

export const httpInstance = axios.create({
  baseURL: SDK_ORIGIN,
});
