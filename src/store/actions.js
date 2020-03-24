import * as types from "store/mutation_types.js";
import { Message, MessageBox } from "element-ui";

export function loginOut({ commit, state }, _this) {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  commit(types.SET_TOKEN, "");
  commit(types.SET_USERNAME, "");
  commit(types.SET_ISCOLLAPSE, false);
  commit(types.SET_MINISTRYLIST, []);
  commit(types.SET_MENULIST, []);
  commit(types.SET_CURRENTNAVPATH, "/login");
  commit(types.SET_TIPLIST, {
    assets: [],
    hostservice: [],
    log: [],
    system: [],
    othertool: []
  });
  commit(types.SET_HISTORYPATH, [{ name: "首页", path: "/home" }]);
  commit(types.SET_AUTHORINFO, "");
  commit(types.SET_ISNAVSHOW, false);
  if (_this == "window") {
    window.location.href = "/#/login";
  } else {
    _this.$router.push("/login");
  }
}
function setTime(commit) {
  let time = new Date().getTime();
  commit(types.SET_LASTTIME, time);
  commit(types.SET_ENDTIME30S, time);
  commit(types.SET_ENDTIME5S, time);
}
export function minloginOut({ commit, state }, _this) {
  setTime(commit);
  let isMove = false;
  document.onmousemove = function() {
    if (isMove) {
      return;
    }
    isMove = true;
    setTime(commit);
    setTimeout(() => {
      isMove = false;
    }, 1000);
  };

  let timer = setInterval(() => {
    let currentTime = new Date().getTime();
    let lastTime = state.lastTime;
    if (currentTime - lastTime > 5 * 60 * 1000) {
      clearInterval(timer);
      MessageBox.alert("由于您长时间未操作，请重新登录！", "提示", {
        confirmButtonText: "确定",
        callback: (action, instance) => {}
      });
      loginOut({ commit, state }, _this);
    }
  }, 1000);
  commit(types.SET_TIMER5MIN, timer);
}
