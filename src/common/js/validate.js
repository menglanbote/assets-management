import { Message, MessageBox } from "element-ui";
export const ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;

export const phoneReg = /^(0\d{4}-)?[123456789]{1}\d{7}$|^(0\d{2}-)?[123456789]{1}\d{7}$|^(0\d{3}-)?[123456789]{1}\d{6}$|^1[3456789]{1}\d{9}$/;

export const passwordReg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z~!@#$%^&*()_\-\+\,\.]+$)(?![a-z0-9]+$)(?![a-z~!@#$%^&*()_\-\+\,\.]+$)(?![0-9~!@#$%^&*()_\-\+\,\.]+$)[a-zA-Z0-9~!@#$%^&*()_\-\+\,\.]{8,24}$/;

export const nameReg = /^[a-zA-Z0-9]([a-zA-Z0-9_]{2,15})$/;

export function checkIpArea(val) {
  let ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
  let isTest = true;
  val = val != undefined ? val.toString() : "";
  if (val.replace(/(^\s*)|(\s*$)/g, "")) {
    let arr = val.split("-");
    if (arr.length != 2) {
      isTest = false;
      return isTest;
    }
    for (let item of arr) {
      isTest = ipReg.test(item);
      if (!isTest) {
        break;
      }
    }
    if (isTest) {
      let firstIp = arr[0].split(",");
      let endIp = arr[1].split(",");
      isTest = checkAreaSize(firstIp, endIp);
    }
  }
  return isTest;
}

export function checkMoreIp(val) {
  let ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
  let isTest = true;
  val = val != undefined ? val.toString() : "";
  if (val.replace(/(^\s*)|(\s*$)/g, "")) {
    let arr = val.split(",");
    for (let item of arr) {
      isTest = ipReg.test(item);
      if (!isTest) {
        break;
      }
    }
  }
  return isTest;
}

export function checkPortArea(val) {
  let isTest = true;
  val = val != undefined ? val.toString() : "";
  if (val.replace(/(^\s*)|(\s*$)/g, "")) {
    let arr = val.split("-");
    if (arr.length != 2) {
      isTest = false;
      return isTest;
    }
    for (let item of arr) {
      if (
        !item ||
        isNaN(item) ||
        parseInt(item) < 1 ||
        parseInt(item) > 65535 ||
        !/^[^0]/.test(item)
      ) {
        isTest = false;
        break;
      }
    }
    let firstIp = [];
    let endIp = [];
    if (isTest) {
      firstIp.push(arr[0]);
      endIp.push(arr[1]);
      isTest = checkAreaSize(firstIp, endIp);
    }
  }
  return isTest;
}

export function checkMorePort(val) {
  let isTest = true;
  val = val != undefined ? val.toString() : "";
  if (val.replace(/(^\s*)|(\s*$)/g, "")) {
    let arr = val.split(",");
    for (let item of arr) {
      if (
        !item ||
        isNaN(item) ||
        parseInt(item) < 1 ||
        parseInt(item) > 65535 ||
        !/^[^0]/.test(item)
      ) {
        isTest = false;
        break;
      }
    }
  }
  return isTest;
}

export function isRepeat(arr1, arr2) {
  let map = {};
  let repeatMsg = [];
  for (let item of arr1) {
    map[item] = item;
  }
  for (let item of arr2) {
    if (map[item]) {
      repeatMsg.push(item);
    }
  }
  let isTest = repeatMsg.length > 0 ? true : false;
  return isTest;
}

export function isSelfRepeat(array) {
  let map = {};
  let repeatMsg = [];
  for (let item of array) {
    if (!map[item]) {
      map[item] = 1;
    } else {
      repeatMsg.push(item);
    }
  }
  let isTest = repeatMsg.length > 0 ? true : false;
  return isTest;
}

export function checkMoreIPandPort(val) {
  let ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
  let isTest = true;
  val = val != undefined ? val.toString() : "";
  if (!val.replace(/(^\s*)|(\s*$)/g, "")) {
    return isTest;
  }
  let arr = val.split(",");

  let newArr = arr.map(item => {
    let itemArr = item.split(":");
    item = {};
    item.ip = itemArr[0] || "";
    item.port = itemArr[1] || "";
    return item;
  });

  for (let item of newArr) {
    isTest = ipReg.test(item.ip);
    if (isTest) {
      isTest =
        !isNaN(item.port) &&
        parseInt(item.port) > 0 &&
        parseInt(item.port) < 65536 &&
        /^[^0]/.test(item);
      if (!isTest) {
        break;
      }
    }
  }
  return isTest;
}

export function checkIp(ips, ...arg) {
  let ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
  for (let item of arg) {
    if (item == "") {
      Message({
        type: "error",
        message: "IP不能为空"
      });
      return false;
    }
    if (!ipReg.test(item)) {
      Message({
        type: "error",
        message: "请输入正确的IP地址,例如:1.1.1.1"
      });
      return false;
    }
  }
  let ipValue = "";
  if (arg.length == 1) {
    ipValue = arg[0];
  }
  if (arg.length == 2) {
    ipValue = `${arg[0]}-${arg[1]}`;
    let arr1 = arg[0].split(".");
    let arr2 = arg[1].split(".");
    for (var i = 0; i < arr1.length; i++) {
      if (parseInt(arr1[i]) < parseInt(arr2[i])) {
        break;
      }
      if (parseInt(arr1[i]) > parseInt(arr2[i])) {
        Message({
          type: "error",
          message: "IP区间地址第一个应该小于第二个"
        });
        return false;
      }
      if (i == 3) {
        if (parseInt(arr1[i]) == parseInt(arr2[i])) {
          Message({
            type: "error",
            message: "IP区间地址第一个应该小于第二个"
          });
          return false;
        }
      }
    }
  }
  for (let ip of ips) {
    if (ip == ipValue) {
      Message({
        type: "error",
        message: "IP地址重复"
      });
      return false;
    }
  }
  return true;
}

export function checkPort(ports, ...arg) {
  for (let item of arg) {
    if (item == "") {
      Message({
        type: "error",
        message: "端口号不能为空"
      });
      return false;
    }
    if (
      isNaN(item) ||
      parseInt(item) < 1 ||
      parseInt(item) > 65535 ||
      !/^[^0]/.test(item)
    ) {
      Message({
        type: "error",
        message: "请输入正确的端口号,端口号大于0小于65536"
      });
      return false;
    }
  }
  let portValue = "";
  if (arg.length == 1) {
    portValue = arg[0];
  }
  if (arg.length == 2) {
    portValue = `${arg[0]}:${arg[1]}`;
    if (parseInt(arg[0]) >= parseInt(arg[1])) {
      Message({
        type: "error",
        message: "端口区间的端口第一个应该小于第二个"
      });
      return false;
    }
  }
  for (let port of ports) {
    if (port == portValue) {
      Message({
        type: "error",
        message: "端口号重复"
      });
      return false;
    }
  }
  return true;
}

function checkAreaSize(arr1, arr2) {
  let isTest = true;
  if (arr1.length - arr2.length != 0) {
    isTest = false;
    return isTest;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (!arr1[i] || !arr2[i]) {
      isTest = false;
      break;
    }
    if (parseInt(arr1[i]) < parseInt(arr2[i])) {
      isTest = false;
      break;
    }
  }
  return isTest;
}



//李雄的验证

//电话
export function isphone  (rule, value, callback)  {
  const phoneReg = /^(0\d{4}-)?[123456789]{1}\d{7}$|^(0\d{2}-)?[123456789]{1}\d{7}$|^(0\d{3}-)?[123456789]{1}\d{6}$|^1[3456789]{1}\d{9}$/

  if (!Number.isInteger(+value)) {
    callback(new Error('请输入数字值'))
  } else {
    if (phoneReg.test(value)) {
      callback()
    } else {
      callback(new Error('号码格式错误,若为座机号码请在区号后增加"-"'))
    }
  }
};

