import store from 'store'

export function isShowTip(pName, cName, tip, func,_this) {
  let data = store.state.tipList
  let tipsData = data[pName];

  if (tipsData) {
    let showTip = true;
    for (let item of tipsData) {
      if (item == cName) {
        showTip = false
      }
    }
    if (showTip) {
      _this.$confirm(tip, "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          func();
        })
        .catch(action => {});
    } else {
      func();
    }
  } else {
    _this.$confirm(tip, "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        func();
      })
      .catch(action => {});
  }
}