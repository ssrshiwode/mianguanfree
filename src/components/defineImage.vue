<template>
  <div id="defineImage">
    <img
      class="normal-image"
      :src="imgUrl"
      alt="load fail"
      v-if="renderType === 'image'"
    />
    <div :class="talk.class" v-if="renderType !== 'image' && !!talk">
      <div class="left">
        <img :src="talk.headImg" alt="load fail" />
      </div>
      <div class="right">
        <p>{{ talk.name }}</p>
        <img :src="talk.imgUrl" alt="load fail" />
      </div>
    </div>
  </div>
</template>

<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "defineImage",
  props: ["value", "speaker", "nameHeadIndex", "nameIndex"],
  data() {
    return {
      renderType: "",
      talk: null,
      imgUrl: ""
    };
  },
  mounted() {
    this.game = gameStorage.get();
    if (!this.speaker) {
      this.renderType = "image";
      this.imgUrl = this.parseImgUrl(this.value);
      return;
    }
    this.talk = {
      headImg: "",
      name: "",
      class: "npc",
      imgUrl: ""
    };
    if (this.speaker == "玩家" || this.speaker == "player_default")
      this.talk.class = "host";
    else this.talk.class = "npc";
    let talkPeople = this.game.data.props[this.speaker];
    talkPeople.nameArray
      ? (this.talk.name = talkPeople.nameArray[this.nameIndex])
      : (this.talk.name = talkPeople.name);
    talkPeople.headImageArray
      ? (this.talk.headImg = this.parseImgUrl(
          talkPeople.headImageArray[parseInt(this.nameHeadIndex)]
        ))
      : (this.talk.headImg = this.parseImgUrl(talkPeople.headImage));
    this.talk.imgUrl = this.parseImgUrl(this.value);
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
#defineImage {
  width: 100%;

  .normal-image {
    display: block;
    width: format-vw(335);
    height: format-vw(274);
    margin: $marginCol auto;
  }

  .npc {
    margin: format-vw(10) format-vw(20);
    display: flex;

    .left {
      width: format-vw(40);
      margin-right: format-vw(10);

      img {
        width: format-vw(40);
        height: format-vw(40);
        border-radius: 50%;
      }
    }

    .right {
      p {
        font-size: 11px;
        color: #ffffff;
        line-height: 15px;
        margin-left: 1px;
        margin-bottom: 4px;
      }
      img {
        width: format-vw(202);
        height: format-vw(142);
      }
    }
  }

  .host {
    margin: format-vw(10) format-vw(20);
    display: flex;
    flex-direction: row-reverse;

    .left {
      width: format-vw(40);
      margin-left: format-vw(10);

      img {
        width: format-vw(40);
        height: format-vw(40);
        border-radius: 50%;
      }
    }

    .right {
      p {
        font-size: 11px;
        color: #ffffff;
        line-height: 15px;
        margin-right: 1px;
        margin-bottom: 4px;
        text-align: right;
      }
      img {
        width: format-vw(202);
        height: format-vw(142);
      }
    }
  }
}
</style>
