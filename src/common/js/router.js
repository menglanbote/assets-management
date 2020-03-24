export function setHistoryPath(_this,stateval,mutationsfunc) {
    let historyPathList = _this.$store.state[stateval].slice()
    let currentHistoryPath = {}
    currentHistoryPath.name = _this.$route.meta.name
    currentHistoryPath.path = _this.$route.path

    if (
      currentHistoryPath.path.indexOf("/login") > -1 ||
      currentHistoryPath.path.indexOf("/install") > -1
    ) {
      return;
    }

    let isExistsPath = false

    for(let item of historyPathList){
      if(item.path == currentHistoryPath.path){
        isExistsPath = true
      } 
    }

    if(!isExistsPath) {
      historyPathList.push(currentHistoryPath)
    }

    _this.$store.commit(mutationsfunc,historyPathList)
  }
  export function setBreadCrumb(_this,mutationsfunc) {
    let currentPath = [];
    for (let item of _this.$route.matched) {
      let breadItem = {};
      breadItem.path = item.path;
      breadItem.name = item.meta.name;
      currentPath.push(breadItem);
    }
    _this.currentPathList = currentPath;
    _this.$store.commit(mutationsfunc,currentPath);
  }
