import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getAreaProvider(params) {
  return ajaxPro({
    url: "/address/provider",
    data: params,
    type: "get"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function addArea(params) {
  return ajaxPro({
    url: "/address/add",
    data: params,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function editArea(params) {
  return ajaxPro({
    url: "/address/modify",
    data: params,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function delArea(params) {
  return ajaxPro({
    url: "/address/del",
    data: params,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function editInfo(params) {
  return ajaxPro({
    url: "/address/findone",
    data: params,
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
