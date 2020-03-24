import { ajaxPro } from "req/http/http";

export function getMenu() {
  return ajaxPro({
    url: "http://localhost:8080/static/menu.json"
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
