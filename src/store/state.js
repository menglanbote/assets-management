const state = {
  // token
  token: "",
  // 用户名
  username: "",
  // 侧边导航是否折叠
  isCollapse: false,
  // 历史记录导航数组
  historyPath: [
    {
      name: "首页",
      path: "/home"
    }
  ],
  // 当前激活的导航
  currentNavPath: "",
  // 组织机构部门列表
  ministryList: [],
  // 菜单列表
  menuList: [],
  // tip提示设置
  tipList: {
    assets: [],
    hostservice: [],
    log: [],
    system: [],
    othertool: []
  },
  //授权信息
  authorInfo: "",
  isNavShow: false,
  timer5min: null,
  lastTime: new Date().getTime(),
  endTime30s: new Date().getTime(),
  endTime5s: new Date().getTime()
};

export default state