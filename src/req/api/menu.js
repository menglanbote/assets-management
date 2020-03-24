import { ajaxPro } from "req/http/http";

export function getMenu() {
  return ajaxPro({
    url: "/menu"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
