import { ajaxPro } from "req/http/http";

export function echartDataDetail(param) {
  return ajaxPro({
    url: "/host/dataStatistics",
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

