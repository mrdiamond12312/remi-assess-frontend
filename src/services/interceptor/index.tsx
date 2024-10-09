import type { ResponseError } from "umi-request";
import { extend } from "umi-request";

import * as Path from "@/constants/path";
import { removeStorageItem } from "@/utils/local-storage";
import { notification } from "antd";

class HttpError extends Error {
  response: Response;
  data: any;
  constructor(response: Response, data: any) {
    super();
    this.response = response;
    this.data = data;
  }
}

const errorHandler = async (err: ResponseError) => {
  const { statusCode, error, message }: TMeta = await err.response.json();
  if (!err?.response) {
    return Promise.reject({
      meta: {
        statusCode: 503,
        message: "Mạng không khả dụng!",
        error: "Mạng không khả dụng!",
      },
      result: {
        data: null,
      },
    });
  } else {
    // Check token expired
    if (
      statusCode === 401 &&
      (window.location.pathname !== Path.HOMEPAGE &&
        window.location.pathname !== Path.LOGIN)
    ) {
      removeStorageItem("accessToken");
      notification.error({
        description: "Please ReLogin to continue!",
        message: "401 - Unauthorized",
        duration: 1,
        onClose: () => {
          window.location.href = Path.LOGIN;
        },
      });
    }
    return Promise.reject({ statusCode, error, message });
  }
};

const request = extend({
  prefix: import.meta.env.VITE_API,
  errorHandler,
});

// /** Add token in header when request */
request.interceptors.request.use(
  (url: string, options) => {
    const token = localStorage.getItem("accessToken");

    options.headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      ...options.headers,
    };

    return {
      url,
      options,
    };
  },
  { global: false }
);

request.interceptors.response.use(
  async (response) => {
    const data = await response.clone().json();

    if (data?.meta?.statusCode === 307) {
      window.location.href = data.result.data.url;
    }

    if (
      data &&
      data?.result &&
      (data?.result?.data || data?.result?.data !== null) &&
      data?.meta
    ) {
      if (data.result.meta) return data.result;
      return data.result.data;
    } else {
      throw new HttpError(
        response,
        data.meta ?? {
          message: data.message,
          statusCode: data.statusCode,
          error: data.error,
        }
      );
    }
  },
  { global: false }
);

export default request;
