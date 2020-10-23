<template>
  <div id="popupNewWindow">
    <div @click="jump()">
      <img :src="icon" alt="load fail" />
      <span>{{ this.text }}</span>
      <img :src="imgUrl" alt="load fail" />
    </div>
  </div>
</template>
<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "popupNewWindow",
  props: ["value", "image", "text"],
  data() {
    return {
      imgUrl: "",
      icon: require("@/assets/网页链接图标.png")
    };
  },
  mounted() {
    this.game = gameStorage.get();
    this.imgUrl = this.parseImgUrl(this.image);
  },
  methods: {
    jump() {
      window.open(this.value);
    },
    parseImgUrl(str) {
      let resourcePrefix = this.game.others.resourcePrefix;
      let name = this.game.others.resources[str].name;
      return resourcePrefix + name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#popupNewWindow {
  width: 100%;

  div {
    height: format-vw(50);
    padding: 0 format-vw(10);
    margin: $marginCol format-vw(56);
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #161515;
    display: flex;
    align-items: center;

    img:first-of-type {
      width: format-vw(28);
      height: format-vw(28);
    }

    img:last-of-type {
      width: format-vw(34);
      height: format-vw(34);
    }

    span {
      width: format-vw(166);
      margin: 0 format-vw(7);
      display: inline-block;
      color: #ffffff;
      font-size: 15px;
      letter-spacing: 0.37px;
      text-overflow: ellipsis;
      overflow-y: hidden;
      white-space: nowrap;
    }
  }
}
</style>
