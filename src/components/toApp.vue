<template>
  <div id="toApp">
    <button @click="open">
      打开APP查看更多
    </button>
    <a ref="openUrl" :href="openUrl"></a>
  </div>
</template>
<script>
export default {
  name: "toApp",
  props: ["gameId"],
  data() {
    return {
      openUrl: ""
    };
  },
  methods: {
    open() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("micromessenger") !== -1) {
        this.$router.push({ name: "Weixin" });
      } else {
        this.isAndroid()
          ? (this.openUrl = `mag://gamedetail?gameId=${
              this.gameId
            }&timestamp=${Date.now()}`)
          : (this.openUrl = `mag://gamedetail?gameId=${this.gameId}`);
        this.$nextTick(() => this.$refs.openUrl.click());
        setTimeout(() => {
          this.$router.push({ name: "Download" });
        }, 1500);
      }
    },
    isAndroid() {
      const u = window.navigator.userAgent;
      return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#toApp {
  width: 100%;

  button {
    width: format-vw(262);
    height: format-vw(40);
    display: block;
    border: none;
    border-radius: 4px;
    background: #dca354;
    margin: $marginCol auto;
    color: #333333;
    font-size: 16px;
    letter-spacing: 0.4px;
    text-align: center;
    line-height: format-vw(40);
  }
}
</style>
