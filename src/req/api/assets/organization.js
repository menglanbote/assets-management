import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getMinistryList() {
  return ajaxPro({
    url: "/ministry/list",
    type: "post"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function addMinistry(param) {
  return ajaxPro({
    url: "/ministry/add",
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

export function editMinistry(param) {
  return ajaxPro({
    url: `/ministry/modify`,
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

export function delMinistry(param) {
  return ajaxPro({
    url: "/ministry/del",
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

export function addManager(param) {
  return ajaxPro({
    url: "/manager/add",
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

export function editManager(param) {
  return ajaxPro({
    url: "/manager/modify",
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

export function delManager(param) {
  return ajaxPro({
    url: "/manager/del",
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
