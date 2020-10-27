<template>
  <div id="home"></div>
</template>

<script>
import getParams from "@/utils/params.js";
import { getGameDetail } from "@/api/index.js";
export default {
  name: "home",
  created() {
    const gameId = getParams("gameId");
    getGameDetail(gameId)
      .then(data => {
        const demo = data.game.demo;
        if (demo === "true") this.$router.replace({ name: "Game" });
        else this.$router.replace({ name: "GameDetail" });
      })
      .catch(error => {
        console.log(error);
        this.$router.replace({ name: "GameDetail" });
      });
  }
};
</script>

<style lang="scss" scoped>
#home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-image: url("~@/assets/默认背景.png");
}
</style>
