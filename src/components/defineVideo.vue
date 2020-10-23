<template>
  <div id="defineVideo">
    <video
      class="normal-video"
      :src="videoUrl"
      controls
      preload
      v-if="renderType === 'video'"
    >
      加载失败
    </video>
    <div :class="talk.class" v-if="renderType !== 'video' && !!talk">
      <div class="left">
        <img :src="talk.headImg" alt="load fail" />
      </div>
      <div class="right">
        <p>{{ talk.name }}</p>
        <video :src="videoUrl" controls preload>
          加载失败
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "defineVideo",
  props: ["value", "speaker", "nameHeadIndex", "nameIndex"],
  data() {
    return {
      renderType: "",
      talk: null,
      videoUrl: ""
    };
  },
  mounted() {
    this.game = gameStorage.get();
    this.videoUrl = this.parseImgUrl(this.value);
    if (!this.speaker) {
      this.renderType = "video";
      return;
    }
    this.talk = {
      headImg: "",
      name: "",
      class: "npc"
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
#defineVideo {
  width: 100%;

  .normal-video {
    display: block;
    width: format-vw(335);
    height: format-vw(201);
    margin: format-vw(20) auto;
    border: 1px solid #ffffff;
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
      video {
        width: format-vw(202);
        height: format-vw(142);
        border: 1px solid #ffffff;
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
      video {
        width: format-vw(202);
        height: format-vw(142);
        border: 1px solid #ffffff;
      }
    }
  }
}
</style>
