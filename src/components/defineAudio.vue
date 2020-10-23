<template>
  <div id="defineAudio">
    <audio
      class="normal-audio"
      :src="audioUrl"
      controls
      preload
      v-if="renderType === 'audio'"
    >
      加载失败
    </audio>
    <div :class="talk.class" v-if="renderType !== 'image' && !!talk">
      <div class="left">
        <img :src="talk.headImg" alt="load fail" />
      </div>
      <div class="right">
        <p>{{ talk.name }}</p>
        <audio :src="audioUrl" controls preload>
          加载失败
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "defineAudio",
  props: ["value", "speaker", "nameHeadIndex", "nameIndex"],
  data() {
    return {
      renderType: "",
      talk: null,
      audioUrl: ""
    };
  },
  mounted() {
    this.game = gameStorage.get();
    this.audioUrl = this.parseImgUrl(this.value);
    if (!this.speaker) {
      this.renderType = "audio";
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
#defineAudio {
  width: 100%;

  .normal-audio {
    display: block;
    width: format-vw(262);
    height: format-vw(50);
    margin: format-vw(20) auto;
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
      audio {
        width: format-vw(262);
        height: format-vw(50);
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
      audio {
        width: format-vw(262);
        height: format-vw(50);
      }
    }
  }
}
</style>
