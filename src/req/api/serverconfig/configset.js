import { ajaxPro, reqUnlodingPro } from "req/http/http";

export function getConfig(param) {
  return ajaxPro({
    url: `/config/${param.type}/get`,
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

export function getConfigUnloading(param) {
  return reqUnlodingPro({
    url: `/config/${param.type}/get`,
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

export function setConfig(param) {
  return ajaxPro({
    url: `/config/${param.type}/modify`,
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
