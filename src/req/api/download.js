import { ajaxPro } from "req/http/http";

export function downloadList(param) {
  return ajaxPro({
    url: `download/list/${param.module}`,
    type: "post",
    data: param
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function delDownload(param) {
  return ajaxPro({
    url: `download/del/${param.module}`,
    type: "post",
    data: param
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function downloadInfo(param) {
  return ajaxPro({
    url: `download/download/${param.module}`,
    type: "post",
    data: param
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export function createDownload(param) {
  return ajaxPro({
    url: `download/create/${param.module}`,
    type: "post",
    data: param
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
