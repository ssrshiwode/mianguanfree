<template>
  <div id="checkBackback" @click.stop>
    <div class="shady" @click="$emit('close')"></div>
    <div class="backpack">
      <p class="title"><span></span>背包<span></span></p>
      <img :src="url" alt="load fail" />
      <p class="content">{{ value }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkBackback",
  props: ["url", "value"]
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
.shady {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.7;
}
#backpack {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: format-vw(335);
  height: format-vw(342);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  .title {
    width: 100%;
    letter-spacing: 0.4px;
    height: format-vw(64);
    color: #ffffff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: format-vw(33);
      height: 2px;
      background: #ffca00;
      margin: 0 5px;
    }
  }

  img {
    width: format-vw(190);
    height: format-vw(174);
    display: block;
    margin: 0 auto;
  }

  .content {
    width: format-vw(279);
    height: format-vw(60);
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    margin: format-vw(15) format-vw(28) format-vw(20) format-vw(28);
    overflow-y: auto;
  }
}
</style>
