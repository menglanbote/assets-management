const tools = {
  setStorageObj: function(key, obj) {
    obj = JSON.stringify(obj);
    sessionStorage.setItem(key, obj);
  },
  getStorageObj: function(key) {
    var obj = JSON.parse(sessionStorage.getItem(key));
    return obj;
  },
  treeData: function(arr) {
    arr.forEach(function(item) {
      delete item.children;
    });
    var map = {};
    arr.forEach(item => {
      map[item.id] = item;
      map[item.id].label = item.name;
    });
    let treeData = [];
    arr.forEach(item => {
      const mapItem = map[item.pid];
      if (mapItem) {
        (mapItem.children || (mapItem.children = [])).push(item);
      } else {
        treeData.push(item);
      }
    });
    return treeData;
  },
  formatDataNumber: function(num, rounddigit) {
    var str = new Array("万", "亿", "兆");
    var item = 0;

    if (num < 10000) {
      return num;
    }
    var resule = num / 10000;
    while (true) {
      if (resule < 10000) {
        break;
      }
      resule = resule / 10000;
      item = item + 1;
    }
    return resule.toFixed(rounddigit) + str[item];
  },
  isArrayNull: function(array) {
    if (array.length == 0) {
      return true;
    } else {
      return false;
    }
  },
  mergeId: function(array) {
    let mergeId = [];
    for (let item of array) {
      item.id && mergeId.push(item.id);
    }
    return mergeId.join(",");
  },
  mergeParam: function(array, param) {
    let mergeParam = [];
    for (let item of array) {
      // item[param]  && mergeParam.push(item[param]);
      mergeParam.push(item[param]);
    }

    return mergeParam.join(",");
  },
  exportSCV: function(str, title = "导出内容") {
    let url = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
    let oA = document.createElement("a");
    oA.href = url;
    oA.download = `${title}.csv`;
    document.body.appendChild(oA);
    oA.click();
    document.body.removeChild(oA);
  },
  IPSort: function(a, b) {
    let oAip = a.ip.split(".");
    let oBip = b.ip.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  src_ipSort: function(a, b) {
    let oAip = a.src_ip.split(".");
    let oBip = b.src_ip.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  dest_ipSort: function(a, b) {
    let oAip = a.dest_ip.split(".");
    let oBip = b.dest_ip.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  source_ipSort: function(a, b) {
    let oAip = a.source_ip.split(".");
    let oBip = b.source_ip.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  target_ipSort: function(a, b) {
    let oAip = a.target_ip.split(".");
    let oBip = b.target_ip.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  domain_nameSort: function(a, b) {
    let oAip = a.domain_name.split(".");
    let oBip = b.domain_name.split(".");
    for (let index = 0; index < 4; index++) {
      if (oAip[index] !== oBip[index]) {
        return oAip[index] - oBip[index];
      }
    }
    return 0;
  },
  downLoad: function(url, download) {
    let oA = document.createElement("a");
    oA.download = download || "";
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    document.body.removeChild(oA);
  },
  formatDate: function(fmt) {
    var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "H+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }
};

export default tools