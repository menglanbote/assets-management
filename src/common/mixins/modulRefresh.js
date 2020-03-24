import store from "store";
export default function(dom) {
  return {
    data() {
      return {
        timer: null,
        currTime: ""
      };
    },
    activated() {
      this.timeToRefresh();
    },
    deactivated() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    methods: {
      reload() {
        this.$refs[dom].reload();
      },
      timeToRefresh() {
        this.timer = setInterval(() => {
          this.currTime = new Date().getTime();
          if (this.currTime - store.state.endTime30s > 30 * 1000) {
            store.commit("SET_ENDTIME30S", this.currTime);
            this.reload();
          }
        }, 1000);
      }
    }
  };
}
