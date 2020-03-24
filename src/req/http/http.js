import Vue from "vue";
import axios from "axios";
import qs from "qs";
import store from "store";
import { ERR_OK } from "req/api/config";
import { loading_open, loading_close } from "common/js/loading";
import { Message, MessageBox } from "element-ui";
const BASE_URL = window.global_config.BASE_URL;

/*  */
export const requestAxios = axios.create({
  baseURL: BASE_URL
});

/**
 * addTimeUrl
 * @param {String} url
 * @param return
 */
function addTimeUrl(url) {
  if (url.indexOf("?") > -1) {
    return url + "&_=" + new Date().getTime();
  } else {
    return url + "?_=" + new Date().getTime();
  }
}

requestAxios.interceptors.request.use(
  config => {
    loading_open();
    return config;
  },
  error => {
    loading_close();
    Message({
      showClose: true,
      message: `错误:请求接口失败[${error}]`,
      type: "error",
      duration: 5000
    });
    return Promise.reject(error);
  }
);
requestAxios.interceptors.response.use(
  res => {
    loading_close();
    return res.data;
  },
  error => {
    loading_close();
    if (error.message == "Request failed with status code 500") {
      error.message = "请求失败";
    }
    if (error.message == "Network Error") {
      error.message = "网络错误";
    }
    if (error.message == "Request aborted") {
      error.message = "请求失败";
    }
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      error.message = "请求超时";
    }
    Message({
      showClose: true,
      message: error.message,
      type: "error",
      duration: 5000
    });
    return Promise.reject(error);
  }
);

/**
 * ajaxPro
 * @param {String} type
 * @param {String} url
 * @param {String} time
 * @param {Object} data
 * @param {String} dataType
 * @param {Object} headers
 * @param {Boolean} contentType
 * @param {Boolean} processData
 * @param return
 * */
export function ajaxPro(opt) {
  let opts = opt || {};
  opts.type = opt.type ? opt.type : "get";
  opts.headers = opt.headers || {};
  opts.contentType =
    typeof opt.contentType === "boolean" ? opt.contentType : true;
  opts.processData =
    typeof opt.processData === "boolean" ? opt.processData : true;

  if (!opts.url) {
    alert("请添加请求的路径!");
    return;
  }

  return requestAxios({
    url: addTimeUrl(opts.url),
    method: opts.type,
    headers: Object.assign({}, opts.headers, {
      "Content-Type": opts.contentType
        ? "application/x-www-form-urlencoded"
        : "multipart/form-data",
      accesstoken: sessionStorage.getItem("token") || ""
    }),
    params: opts.type.toLowerCase() == "get" ? opts.data || {} : {},
    data:
      opts.type.toLowerCase() == "post"
        ? (opts.processData ? qs.stringify(opts.data) : opts.data) || {}
        : {},
    responseType: opts.dataType || "json",
    timeout: opts.time || 60 * 1000
  })
    .then(res => {
      if (res.code == ERR_OK) {
        return Promise.resolve(res);
      } else {
        if (res.code == 103) {
          MessageBox.alert(res.msg, "提示信息", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {
              store._actions.loginOut[0]("window");
            }
          });
        } else {
          Message({
            showClose: true,
            message: res.msg,
            type: "error",
            duration: 5000
          });
        }
        return Promise.reject("");
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

/*  */
export const reqUnloding = axios.create({
  baseURL: BASE_URL
});

reqUnloding.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Message({
      showClose: true,
      message: `错误:请求接口失败[${error}]`,
      type: "error",
      duration: 5000
    });
    return Promise.reject(error);
  }
);

reqUnloding.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    if (error.message == "Request failed with status code 500") {
      error.message = "请求失败";
    }
    if (error.message == "Network Error") {
      error.message = "网络错误";
    }
    if (error.message == "Request aborted") {
      error.message = "请求失败";
    }
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      error.message = "请求超时";
    }
    Message({
      showClose: true,
      message: error.message,
      type: "error",
      duration: 5000
    });
    return Promise.reject(error);
  }
);
/**
 * reqUnlodingPro
 * @param {String} type
 * @param {String} url
 * @param {String} time
 * @param {Object} data
 * @param {String} dataType
 * @param {Object} headers
 * @param {Boolean} contentType
 * @param {Boolean} processData
 * @param return
 * */
export function reqUnlodingPro(opt) {
  let opts = opt || {};
  opts.type = opt.type ? opt.type : "get";
  opts.headers = opt.headers || {};
  opts.contentType =
    typeof opt.contentType === "boolean" ? opt.contentType : true;
  opts.processData =
    typeof opt.processData === "boolean" ? opt.processData : true;

  if (!opts.url) {
    alert("请添加请求的路径!");
    return;
  }

  return reqUnloding({
    url: addTimeUrl(opts.url),
    method: opts.type,
    headers: Object.assign({}, opts.headers, {
      "Content-Type": opts.contentType
        ? "application/x-www-form-urlencoded"
        : "multipart/form-data",
      accesstoken: sessionStorage.getItem("token") || ""
    }),
    params: opts.type.toLowerCase() == "get" ? opts.data || {} : {},
    data:
      opts.type.toLowerCase() == "post"
        ? (opts.processData ? qs.stringify(opts.data) : opts.data) || {}
        : {},
    responseType: opts.dataType || "json",
    timeout: opts.time || 60 * 1000
  })
    .then(res => {
      if (res.code == ERR_OK) {
        return Promise.resolve(res);
      } else {
        if (res.code == 103) {
          MessageBox.alert(res.msg, "提示信息", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {
              store._actions.loginOut[0]("window");
            }
          });
        } else {
          Message({
            showClose: true,
            message: res.msg,
            type: "error",
            duration: 5000
          });
        }
        return Promise.reject("");
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
