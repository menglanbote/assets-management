import { ajaxPro } from "req/http/http";
export function delAll(param) {
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
  