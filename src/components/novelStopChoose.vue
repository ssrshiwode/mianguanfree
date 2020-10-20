<template>
  <div id="novelStopChoose">
    <img :src="novelStopChooseIcon" alt="load fail" />
    <span>点一点继续哦～</span>
  </div>
</template>

<script>
export default {
  name: "novelStopChoose",
  props: [],
  data() {
    return {
      novelStopChooseIcon: require("@/assets/novelStopChooseIcon.png")
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/util.scss";
#novelStopChoose {
  width: 100%;
  height: 30px;
  margin: format-vw(20) 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 0.35px;
  }
}
</style>
