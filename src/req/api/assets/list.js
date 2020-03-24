import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getDropDownData(param) {
  return ajaxPro({
    url: "/host/filterData",
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

export function addHost(param) {
  return ajaxPro({
    url: "/host/add",
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

export function checkHost(param) {
  return ajaxPro({
    url: "/host/checkClient",
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

export function delHost(param) {
  return ajaxPro({
    url: "/host/delete",
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

export function hostDetail(param) {
  return ajaxPro({
    url: `host/${param.id}/detail`,
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

export function editHost(param) {
  return ajaxPro({
    url: `host/${param.id}/modify`,
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

export function getHostInfo(param) {
  return ajaxPro({
    url: `host/${param.id}/info`,
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

export function hardwareUsed(param) {
  return reqUnlodingPro({
    url: `host/${param.id}/hardwareUsed`,
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
