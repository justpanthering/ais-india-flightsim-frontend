import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./constants";

class APIRouteInstance {
  public client: AxiosInstance;
  public constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
    });
  }
}

export const apiRouteInstance = new APIRouteInstance();
