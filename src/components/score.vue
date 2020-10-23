<template>
  <div id="score">
    <span :style="{ fontSize: fontSize + 'px' }">{{ showScore }}</span>
    <template v-for="(i, index) in imgs">
      <img :src="i" :key="index" />
    </template>
  </div>
</template>

<script>
import collectImg from "@/assets/collect.png";
import collectedImg from "@/assets/collected.png";

export default {
  name: "Score",
  props: ["scoreAverage", "fontSize"],
  computed: {
    score() {
      return parseInt(this.scoreAverage, 10);
    },
    showScore() {
      return this.score.toFixed(1);
    },
    imgs() {
      let arr = new Array(5);
      arr.fill(collectedImg, 0, this.score);
      arr.fill(collectImg, this.score);
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
#score {
  display: flex;
  align-items: center;
}

span {
  font-family: "DINAlternateBold";
  color: #ffffff;
}

img {
  width: 12px;
  height: 12px;
  margin-left: 5px;
}
</style>
