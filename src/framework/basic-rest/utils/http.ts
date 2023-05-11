import axios from "axios";
import {FCAPI_URL} from "@framework/utils/api-endpoints";

const http = axios.create({
  baseURL: FCAPI_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
