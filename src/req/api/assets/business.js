import { ajaxPro } from "req/http/http";

export function addBusiness(param) {
  return ajaxPro({
    url: "/software/add",
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

export function getBusinessInfo(param) {
  return ajaxPro({
    url: "/software/detail",
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

export function editBusiness(param) {
  return ajaxPro({
    url: "/software/modify",
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

export function delBusiness(param) {
  return ajaxPro({
    url: "/software/del",
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

export function setRetire(param) {
  return ajaxPro({
    url: "/software/retire",
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
