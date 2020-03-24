// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
Vue.prototype.$axios = axios;
import { ajaxPro } from "req/http/http";
Vue.prototype.$ajax = ajaxPro;
import tools from "common/tools";
Vue.prototype.$tools = tools;
Date.prototype.format = tools.formatDate;
import * as icons from 'common/js/tagIcon'
Vue.prototype.$icons = icons
import * as validates from "common/js/validate";
Vue.prototype.$validates = validates;
import md5 from "js-md5";
Vue.prototype.$md5 = md5;
import VueParticles from "vue-particles";
Vue.use(VueParticles);
import layer from "vue-layer-shadow";
import "vue-layer-shadow/lib/vue-layer.css";
Vue.prototype.$layer = layer(Vue);
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
Vue.use(MuseUI);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
Vue.prototype.$echarts = echarts;
import { isShowTip } from "common/js/showtip";
Vue.prototype.$isShowTip = isShowTip;
import gElTable from "components/g_el_table";
Vue.component("gElTable", gElTable);
Vue.config.productionTip = false;
import "static/albb/iconfont.css";
import "static/albb/iconfont.js";
import * as types from "store/mutation_types.js";
import layerComponents from 'common/js/layer'


router.beforeEach((to, form, next) => {
  store.commit(types.SET_CURRENTNAVPATH, to.fullPath);
  if (to.matched.some(record => record.meta.requireAuth)) {
    // if (sessionStorage.token) {
      if (to.meta.layer) {

        vue.$layer.iframe({
          content: {
            content: layerComponents[to.meta.component],
            parent: vue,
            data: {
              setCnavPath: layerid => {
                store.commit(types.SET_CURRENTNAVPATH, form.fullPath);
              }
            }
          },
          area: to.meta.area || ["300px", "170px"],
          title: to.meta.name,
          shadeClose: false,
          btn: ["确定", " 取消"],
          cancel: layerid => {
            vue.$layer.close(layerid);
            store.commit(types.SET_CURRENTNAVPATH, form.fullPath);
          }
        });
        return;
      }
      next();
    // } else {
    //   next({
    //     path: "/login",
    //     query: { redirect: to.fullPath }
    //   });
    // }
  } else {
    next();
  }
});

/* eslint-disable no-new */
var vue = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

window.addEventListener("beforeunload", () => {
  tools.setStorageObj("store", store.state);
});
