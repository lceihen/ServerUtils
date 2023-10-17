export { request } from "./request";

export const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

//@ts-ignore
export const inMicroEnv = window.__POWERED_BY_WUJIE__ === true;
//@ts-ignore
export const _window = inMicroEnv ? window.$wujie?.props?.realWindow : window;
//@ts-ignore
export const getSubAppProps = window.$wujie?.props || {};

console.log();
