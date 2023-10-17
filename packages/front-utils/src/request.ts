import { _window } from "./index";

const replaceWindow = _window ? _window : window;

export const handleGetParamString = (data: any = {}) => {
  const queryArray: Array<string> = [];
  Object.keys(data).map((key) => {
    queryArray.push(`${key}=${encodeURIComponent(data[key])}`);
  });
  return queryArray.join("&");
};

interface IRequestProps {
  BaseUrl: string;
  url: string;
  config?: any;
  data?: any;
  method?: string;
  headers?: any;
  params?: any;
  authConfig: {
    prodUrl: string;
    secret: string;
    authUrl: string;
    clientId: string;
  };
}

export const handletransformData = (
  data: any,
  method: string,
  headers: any
) => {
  if (method === "GET") {
    return null;
  } else if (
    method === "POST" &&
    headers["Content-Type"]?.includes("x-www-form-urlencoded")
  ) {
    return handleGetParamString(data);
  } else {
    return JSON.stringify(data);
  }
};

export default (props: IRequestProps) => {
  let {
    BaseUrl,
    url,
    config = {},
    data,
    method = "GET",
    headers = {},
    params = {},
    authConfig,
  } = props || {};

  method = method.toUpperCase();

  const paramString = handleGetParamString(params);

  url =
    method === "GET" ? `${url}${paramString ? "?" + paramString : ""}` : url;

  data = handletransformData(data, method, headers);
  return new Promise((resolve, reject) => {
    fetch(`${BaseUrl}${url}`, {
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...config,
      method,
      body: data,
    })
      .then((midRes) => {
        if (midRes?.redirected) {
          replaceWindow.location.replace(midRes?.url);
        }
        return midRes.json();
      })
      .then((res) => {
        if (res?.code === "-1") {
          console.error("error", res?.message);
          reject(res);
        }

        if (res?.code === "-10000") {
          const { prodUrl, authUrl, clientId, secret } = authConfig;
          const redirectUri = encodeURIComponent(`${prodUrl}`);

          replaceWindow.location.replace(
            `${authUrl}?redirectUri=${redirectUri}&clientId=${clientId}&secret=${secret}`
          );
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
