<template>
  <div id="talk">
    <div :class="talkClass" v-if="!!talk">
      <div class="head">
        <img :src="talk.headImg" alt="load fail" v-if="!!talk.headImg" />
        <div class="placeholder" v-else></div>
      </div>
      <div class="content">
        <p>{{ talk.name }}</p>
        <div>{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "talk",
  props: ["nameHeadIndex", "nameIndex", "speaker", "value"],
  data() {
    return {
      game: {},
      talkClass: "host",
      talk: null,
      resourcePrefix: ""
    };
  },
  mounted() {
    this.game = gameStorage.get();
    if (this.speaker == "玩家" || this.speaker == "player_default")
      this.talkClass = "host";
    else this.talkClass = "npc";
    this.resourcePrefix = this.game.others.resourcePrefix;
    let talkPeople = this.game.data.props[this.speaker];
    this.talk = {
      headImg: "",
      name: ""
    };
    if (this.speaker) {
      talkPeople.nameArray
        ? (this.talk.name = talkPeople.nameArray[this.nameIndex])
        : (this.talk.name = talkPeople.name);
      talkPeople.headImageArray
        ? (this.talk.headImg = this.parseImgUrl(
            talkPeople.headImageArray[parseInt(this.nameHeadIndex)]
          ))
        : (this.talk.headImg = this.parseImgUrl(talkPeople.headImage));
    }
  },
  methods: {
    parseImgUrl(str) {
      let name = this.game.others.resources[str].name;
      return this.resourcePrefix + name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/util.scss";
#talk {
  width: 100%;

  .npc {
    margin: $marginCol format-vw(20);
    display: flex;

    .head {
      width: format-vw(40);
      margin-right: format-vw(10);

      img {
        width: format-vw(40);
        height: format-vw(40);
        border-radius: 50%;
      }

      .placeholder {
        width: format-vw(40);
        height: format-vw(40);
        border-radius: 50%;
        background: black;
        border: 1px solid #ffffff;
      }
    }

    .content {
      max-width: format-vw(232);
      p {
        height: 15px;
        font-size: 11px;
        color: #ffffff;
        line-height: 15px;
        margin-left: 1px;
        margin-bottom: 4px;
      }
      div {
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.15);
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.4px;
        color: #ffffff;
        padding: format-vw(13) format-vw(15);
        text-align: justify;
      }
    }
  }

  .host {
    margin: $marginCol format-vw(20);
    display: flex;
    flex-direction: row-reverse;

    .head {
      width: format-vw(40);
      margin-left: format-vw(10);

      img {
        width: format-vw(40);
        height: format-vw(40);
        border-radius: 50%;
      }
    }

    .content {
      width: format-vw(232);
      p {
        font-size: 11px;
        color: #ffffff;
        line-height: 15px;
        margin-right: 1px;
        margin-bottom: 4px;
        text-align: right;
      }
      div {
        border-radius: 5px;
        background: #ffca00;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.4px;
        color: #333333;
        padding: format-vw(13) format-vw(15);
        text-align: justify;
      }
    }
  }
}
</style>
