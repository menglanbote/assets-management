import store from "store";
export default function(dom) {
  return {
    data() {
      return {
        firstTime: "",
        endTime: "",
        currTime: "",
        lastTime:"",
        timer: null
      };
    },
    created() {
      this.firstTime = (new Date().getTime() / 1000) | 0;
      this.endTime = (new Date().getTime() / 1000) | 0;
      this.timeToRefresh();
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    filters: {
      filterIsNew(val, firstTime) {
        return parseInt(val) > firstTime ? "warningTip" : "";
      }
    },
    methods: {
      reload() {
        this.$refs[dom].reload();
        this.firstTime = this.endTime;
        this.endTime = (new Date().getTime() / 1000) | 0;
      },
      timeToRefresh() {
        this.timer = setInterval(() => {
          this.currTime = new Date().getTime();
          if (this.currTime - store.state.endTime5s > 20 * 1000) {
            store.commit("SET_ENDTIME5S", this.currTime);
            this.reload();
          }
        }, 1000);
      }
    }
  };
}
