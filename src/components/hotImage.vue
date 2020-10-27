<template>
  <div id="hotImage">
    <p>暂不支持热图功能，请前往APP查看</p>
  </div>
</template>
<script>
export default {
  name: "hotImage"
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#hotImage {
  width: 100%;
  font-size: 18px;
  p {
    color: red;
    line-height: 34px;
    letter-spacing: 2px;
    text-align: justify;
    margin: $marginCol format-vw(25);
    word-break: break-word;
  }
}
</style>
