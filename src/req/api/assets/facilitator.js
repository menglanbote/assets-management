import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getDropDownData() {
  return ajaxPro({
    url: "/service/indexdata"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function addFacilitator(param) {
  return ajaxPro({
    url: "/service/add",
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

export function findOneFacilitator(param) {
  return ajaxPro({
    url: `/service/detail`,
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

export function editFacilitator(param) {
  return ajaxPro({
    url: `/service/modify`,
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

export function delFacilitator(param) {
  return ajaxPro({
    url: "/service/del",
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

export function endFacilitator(param) {
  return ajaxPro({
    url: `/service/endcontract`,
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

export function historyFacilitator(param) {
  return ajaxPro({
    url: `/service/servicehistory`,
    data: param
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function updateFacilitator(param) {
  return ajaxPro({
    url: `/service/updateservice`,
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
