import Vue from "vue";
import Router from "vue-router";
import { getMenu } from "req/api/menu";
import store from "store";
import * as types from "store/mutation_types";
// import {mapActions} from 'vuex'

const home = () => import("views/home/home");
const login = () => import("views/user/login");
const install = () => import("views/install");
const error404 = () => import("views/status/404");
const unauthorized = () => import("views/status/unauthorized");
/* 资产管理 */
const assets = () => import("views/assets");
const assets_list = () => import("views/assets/list");
const assets_area = () => import("views/assets/area");
const assets_business = () => import("views/assets/business");
const assets_facilitator = () => import("views/assets/facilitator");
const assets_organization = () => import("views/assets/organization");

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
      meta: {
        requireAuth: true,
        name: "主页"
      }
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        requireAuth: true,
        name: "主页"
      }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        name: "登录"
      }
    },
    {
      path: "/install",
      name: "install",
      component: install,
      meta: {
        name: "产品安装向导"
      }
    },
    {
      path: "/404",
      name: "404",
      component: error404,
      meta: {
        requireAuth: true,
        name: "404"
      }
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: unauthorized,
      meta: {
        name: "温馨提示",
        requireAuth: true,
        layer: true,
        area: ["350px", "250px"],
        component: "unauthorized"
      }
    }
  ]
});

//
let menuObj = {
  assets: {
    component: assets,
    meta: {
      requireAuth: true
    }
  },
  assets_list: {
    component: assets_list,
    meta: {
      requireAuth: true
    }
  },
  assets_area: {
    component: assets_area,
    meta: {
      requireAuth: true
    }
  },
  assets_organization: {
    component: assets_organization,
    meta: {
      requireAuth: true
    }
  },
  assets_business: {
    component: assets_business,
    meta: {
      requireAuth: true
    }
  },
  assets_facilitator: {
    component: assets_facilitator,
    meta: {
      requireAuth: true
    }
  }
};

//
export function setMenu() {
  let menuList = [];
  return getMenu()
    .then(res => {
      var showMenu = [];
      menuList = res.data;
      store.commit(types.SET_MENULIST, menuList);
      for (let item of menuList) {
        if (menuObj[item.name]) {
          menuObj[item.name].name = item.name;
          if (item.redirect) {
            menuObj[item.name].redirect = item.redirect;
          }
          menuObj[item.name].path = item.path;
          menuObj[item.name].meta.name = item.text;
          setMenuChild(item.children, menuObj, item.name);
          showMenu.push(menuObj[item.name]);
        }
      }
      return showMenu;
    })
    .then(res => {
      res.push({
        path: "*",
        redirect: "/404"
      });
      router.addRoutes(res);
      return menuList;
    });
}

/**
 * setMenuChild
 * @param {Array} clist
 * @param {Object} obj
 * @param {String} itemname
 */
function setMenuChild(clist, obj, itemname) {
  if (clist && clist.length > 0) {
    obj[itemname].children = [];

    for (let subitem of clist) {
      if (obj[subitem.name]) {
        obj[subitem.name].name = subitem.name;
        obj[subitem.name].path = subitem.path;
        if (subitem.redirect) {
          menuObj[subitem.name].redirect = subitem.redirect;
        }
        obj[subitem.name].meta.name = subitem.text;
        obj[itemname].children.push(obj[subitem.name]);

        setMenuChild(subitem.children, obj, subitem.name);
      }
    }
  }
}

export default router;
