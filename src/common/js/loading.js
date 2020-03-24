import Vue from "vue";
import { Loading } from "element-ui";

// 加载打开
let laoding = false;
let loading_wrap = null;
export function loading_open() {
  if (!laoding) {
    loading_wrap = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.3)"
    });
  } else {
    return;
  }
  laoding = true;
  
}
// 加载关闭
export function loading_close() {
  if (loading_wrap) {
    loading_wrap.close();
    loading_wrap = null;
  }
  laoding = false;
}
