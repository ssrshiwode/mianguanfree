<template>
  <div id="setPaintingTalk">
    <div class="shady"></div>
    <div class="content" v-if="!!talk">
      <img
        class="paint"
        :class="{ right: talk.isRight }"
        :src="talk.headImg"
        alt="load fail"
      />
      <div class="talk">
        <p><span></span>{{ talk.name }}<span></span></p>
        <p>
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "setPaintingTalk",
  props: ["value", "speaker", "nameHeadIndex", "nameIndex", "NPCAlignment"],
  data() {
    return {
      game: "",
      talk: null
    };
  },
  mounted() {
    this.game = gameStorage.get();
    this.talk = {
      headImg: "",
      name: ""
    };
    if (!this.nameHeadIndex) this.nameHeadIndex = "0";
    if (!this.nameIndex) this.nameIndex = 0;
    let talkPeople = this.game.data.props[this.speaker];
    this.talk.name = talkPeople.nameArray[this.nameIndex];
    this.talk.headImg = this.parseImgUrl(
      talkPeople.headImageArray[parseInt(this.nameHeadIndex)]
    );
    this.NPCAlignment == "right"
      ? (this.talk.isRight = true)
      : (this.talk.isRight = false);
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
#setPaintingTalk {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .shady {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    opacity: 0.7;
  }

  .content {
    position: absolute;
    left: format-vw(15);
    right: format-vw(15);
    bottom: format-vw(100);
    display: flex;
    flex-direction: column;

    .paint {
      width: format-vw(240);
      height: format-vw(240);
    }

    .paint.right {
      margin-left: format-vw(105);
    }

    .talk {
      width: format-vw(345);
      height: format-vw(142);
      background: #131312;
      border-radius: 2px;
      font-size: 14px;
      color: #ffffff;
      overflow-y: auto;

      p:first-of-type {
        line-height: 19px;
        margin: format-vw(15) 0 format-vw(15) format-vw(21);
        span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #c08942;
          border-radius: 50%;
          margin: 0 format-vw(6);
        }
      }
      p:last-of-type {
        line-height: 26px;
        text-align: justify;
        letter-spacing: 3px;
        margin: 0 format-vw(35);
      }
    }
  }
}
</style>
