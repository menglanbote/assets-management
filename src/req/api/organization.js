import { ajaxPro } from "req/http/http";

export function getBumenList() {
    return ajaxPro({
      url: "http://localhost:8080/static/bumen.json"
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        return Promise.reject(err)
    })
}