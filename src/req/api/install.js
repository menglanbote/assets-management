import { ajaxPro } from "req/http/http";

export function onlineAuthor(params) {
  return ajaxPro({
    url: "/install/online",
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

export function offlineAuthor(params) {
  return ajaxPro({
    url: "/install/offline",
    type: "post",
    contentType: false,
    processData: false,
    data: params
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function downloadKey(params) {
  return ajaxPro({
    url: "/install/download",
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

export function setDatabaseConfig(params) {
  return ajaxPro({
    url: "/install/databaseconfig",
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

export function setUseConfig(params) {
  return ajaxPro({
    url: "/install/userconfig",
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

export function addproxyip(params) {
  return ajaxPro({
    url: "/install/addproxyip",
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

export function getmodule(params) {
  return ajaxPro({
    url: "/install/getmodule",
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
