import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getCaptcha() {
  return reqUnlodingPro({
    url: "/code"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function postLogin(params) {
  return ajaxPro({
    url: "/login",
    type: "post",
    data: params
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function authInfomation(param) {
  return ajaxPro({
    url: "/platform/auth",
    data: param,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function isInstall(param) {
  return ajaxPro({
    url: "/isInstall",
    data: param,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
