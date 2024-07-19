import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export interface MainErrorDto {
  message: string;
  statusCode?: number;
  statusText?: string;
}
export interface CommonResponse<T> {
  code: number;
  data: T | null;
  error: MainErrorDto | null;
}

export const BASE_URL = `http://127.0.0.1:3000`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// By adding the current URL as a header to each request,
// the server can know from which UI page the request originated.
// This can be helpful for debugging, analytics, or other monitoring purposes.
axiosInstance.interceptors.request.use(
  (request: any) => {
    const currentUrl = window.location.href;
    request.headers["Current-UI-Url"] = currentUrl;
    return request;
  },
  (error: any) => Promise.reject(error)
);

async function request<T, D = unknown>(
  method: "get" | "post" | "put" | "patch" | "delete",
  path: string,
  data?: D,
  config: AxiosRequestConfig = {}
): Promise<CommonResponse<T>> {
  try {
    const response = await axiosInstance.request<T>({
      url: path,
      method,
      data: method === "delete" ? undefined : data,
      ...(method === "delete" && { data }),
      ...config,
    } as AxiosRequestConfig<D>);
    return {
      code: response.status,
      data: response.data,
      error: null,
    };
  } catch (error: AxiosError<MainErrorDto> | unknown) {
    const { response } = error as AxiosError<MainErrorDto>;
    return {
      code: response?.status as number,
      data: null,
      error: response?.data as MainErrorDto,
    };
  }
}

const httpHelper = {
  get: <T>(path: string) => request<T>("get", path),
  post: <T, D = unknown>(path: string, payload?: D) =>
    request<T, D>("post", path, payload),
  put: <T, D = unknown>(path: string, payload?: D) =>
    request<T, D>("put", path, payload),
  patch: <T, D = unknown>(path: string, payload?: D) =>
    request<T, D>("patch", path, payload),
  delete: <T, D = unknown>(path: string, payload?: D) =>
    request<T, D>("delete", path, payload),
};

export default httpHelper;
