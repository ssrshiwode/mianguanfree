<template>
  <div id="getBackbackAlert">
    <p class="title"><span></span>你获得了<span></span></p>
    <p class="name">{{ name }}</p>
    <img :src="imgUrl" alt="load fail" />
    <p class="content">{{ value }}</p>
  </div>
</template>
<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "getBackpackAlert",
  props: ["attachment"],
  data() {
    return {
      game: {},
      name: "",
      imgUrl: "",
      value: ""
    };
  },
  created() {
    this.game = gameStorage.get();
    let key = this.attachment[0].key;
    this.name = this.game.data.props[key].name;
    this.imgUrl = this.parseImgUrl(this.game.data.props[key].url);
    this.value = this.game.data.props[key].value;
  },
  methods: {
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
#getBackbackAlert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: format-vw(335);
  height: format-vw(362);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  .title {
    width: 100%;
    letter-spacing: 0.4px;
    height: format-vw(47);
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

  .name {
    width: 100%;
    height: format-vw(42);
    line-height: format-vw(42);
    color: #999999;
    font-size: 12px;
    text-align: center;
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
