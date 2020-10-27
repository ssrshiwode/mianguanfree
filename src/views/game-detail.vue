<template>
  <div id="game-detail">
    <img class="background" src="@/assets/background.jpg" />
    <div class="header">
      <img class="header-background" :src="game.coverImage" />
      <img class="cover-img" :src="game.coverImage" />
      <div class="mask"></div>
      <div class="information">
        <p>{{ game.gameName }}</p>
        <p>{{ game.subtitle }}</p>
        <div class="themes">
          <template v-for="(theme, index) in game.themes">
            <span :key="index">{{ theme }}</span>
          </template>
        </div>
        <p>{{ game.theme }}</p>
        <div class="score">
          <score :score-average="game.scoreAverage" font-size="14" />
          <span>{{ game.playerCount }}人玩过</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="introduction">
        <p>剧情简介</p>
        <p>{{ game.desc }}</p>
      </div>
      <div class="hr"></div>
      <div class="user">
        <p>用户评价</p>
        <template v-for="(comment, index) in evaluation">
          <div class="comment" :key="index">
            <div class="comment-background"></div>
            <div class="comment-header">
              <img :src="comment.headimgurl" />
              <div class="comment-user">
                <span>{{ comment.username }}</span>
                <score :score-average="comment.score" font-size="16" />
              </div>
            </div>
            <p>{{ comment.content }}</p>
          </div>
        </template>
      </div>
    </div>
    <a class="footer" @click="open">
      打开APP查看更多
    </a>
    <a ref="openUrl" :href="openUrl"></a>
  </div>
</template>

<script>
import axios from "axios";
import score from "@/components/score.vue";

export default {
  name: "GameDetail",
  components: { score },
  data() {
    return {
      gameId: "",
      openUrl: "",
      game: {
        gameName: "",
        subtitle: "",
        desc: "",
        coverImage: "",
        scoreAverage: "",
        playerCount: 0,
        themes: []
      },
      evaluation: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.gameId = this.getParams("gameId");
      let url = !this.getParams("env")
        ? "https://game.itaotuo.com/puzzle-manager/game/H5/getGameDetailByGameId"
        : "https://t1.itaotuo.com/puzzle/game/H5/getGameDetailByGameId";
      axios
        .get(url, {
          params: {
            gameId: this.gameId
          }
        })
        .then(data => {
          data = data.data.data;
          this.game = data.game;
          this.evaluation = data.evaluation;
        })
        .catch(e => console.log(e));
    },
    open() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("micromessenger") !== -1) {
        this.$router.push({ name: "Weixin" });
      } else {
        this.isAndroid()
          ? (this.openUrl = `mag://gamedetail?gameId=${
              this.gameId
            }&timestamp=${Date.now()}`)
          : (this.openUrl = `mag://gamedetail?gameId=${this.gameId}`);
        this.$nextTick(() => this.$refs.openUrl.click());
        setTimeout(() => {
          this.$router.push({ name: "Download" });
        }, 1500);
      }
    },
    getParams(attr) {
      const url = window.document.location.search.toString();
      let u = url.split("?");
      const params = {};
      if (typeof u[1] === "string") {
        u = u[1].split("&");
        for (var i in u) {
          var j = u[i].split("=");
          params[j[0]] = j[1];
        }
      }
      if (attr) return params[attr];
      return params;
    },
    isAndroid() {
      const u = window.navigator.userAgent;
      return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    }
  }
};
</script>

<style lang="scss" scoped>
$design-width: 375; // 设计稿中的宽度，单位px

/* 将设计稿中元素的px转换为html中的vw */
@function formate-width($px) {
  @return $px * 100vw / $design-width;
}

#game-detail {
  width: 100vw;
  height: 100vh;
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: -3;
}

.header,
.content,
.footer {
  width: 100vw;
}

.header {
  position: relative;
  height: formate-width($px: 176);
  display: flex;
  overflow: hidden;
  color: #ffffff;
  .header-background {
    position: absolute;
    filter: blur(5px);
    width: 100vw;
    z-index: -2;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.7;
    z-index: -1;
  }
  .cover-img {
    width: 31vw;
    margin: 8vw 4vw 8vw 5.3vw;
  }
  .information {
    width: 59.7vw;
    height: 27.7vw;
    margin-top: 9vw;
    p:nth-of-type(1),
    p:nth-of-type(2) {
      width: 54.6vw;
      font-family: "FZLTXHJW", sans-serif;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    p:nth-of-type(1) {
      font-size: 20px;
      letter-spacing: 0.43px;
      line-height: 28px;
    }
    p:nth-of-type(2) {
      color: #8c8c8c;
      font-size: 11px;
      letter-spacing: 0.55px;
      line-height: 15px;
      margin-top: 4px;
    }
    .themes {
      margin-top: 5.3vw;
      width: 100%;
      overflow-x: scroll;
      white-space: nowrap;
      span {
        display: inline-block;
        height: 19px;
        padding: 0 4px;
        font-size: 11px;
        letter-spacing: 0.27px;
        line-height: 19px;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        margin-right: 10px;
      }
    }
    .score {
      display: flex;
      align-items: center;
      margin-top: 4px;
      span:last-of-type {
        color: #dca354;
        font-size: 10px;
        letter-spacing: 0.25px;
        line-height: 14px;
        font-family: "FZLTXHJW", sans-serif;
        padding-left: 6.1vw;
      }
    }
  }
}

.content {
  height: calc(100vh - #{formate-width($px: 176) + formate-width($px: 45)});
  overflow-y: scroll;

  .introduction {
    p:first-of-type {
      font-size: 18px;
      font-family: "FZLTZHJW";
      letter-spacing: 0.75px;
      padding: 5.3vw 0 0 5.3vw;
      color: #ffffff;
    }

    p:last-of-type {
      white-space: pre-wrap;
      font-size: 14px;
      letter-spacing: 0.35px;
      line-height: 7vw;
      font-family: "FZLTXHJW", sans-serif;
      color: #ffffff;
      text-align: justify;
      padding: 2.6vw 6.4vw 5.3vw 5.3vw;
    }
  }

  .hr {
    width: 89.3vw;
    height: 1px;
    background: #313131;
    margin-left: 5.3vw;
  }

  .user {
    p:first-of-type {
      font-size: 18px;
      font-family: "FZLTZHJW";
      letter-spacing: 0.75px;
      padding: 5.3vw 0 0 5.3vw;
      color: #ffffff;
    }

    .comment {
      position: relative;
      box-sizing: border-box;
      width: 89.3vw;
      margin: 2.7vw 5.3vw 4vw 5.3vw;
      color: #ffffff;
      font-family: "FZLTXHJW", sans-serif;
      padding: 4vw;
      .comment-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #aaaaaa;
        opacity: 0.1;
      }
      .comment-header {
        display: flex;
        img {
          width: 9.6vw;
          height: 9.6vw;
          border-radius: 50%;
        }
        .comment-user {
          margin-left: 9px;
          span:first-of-type {
            font-size: 12px;
            letter-spacing: 0.3px;
            line-height: 16px;
            font-family: "FZLTXHJW", sans-serif;
          }
        }
      }
      p {
        font-size: 14px;
        letter-spacing: 0.35px;
        line-height: 7vw;
        font-family: "FZLTXHJW", sans-serif;
        color: #ffffff;
        text-align: justify;
        padding: 4vw 0 0 0;
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  height: formate-width($px: 45);
  text-align: center;
  letter-spacing: 0.4px;
  line-height: formate-width($px: 45);
  text-decoration: none;
  background: #dca354;
  color: #333333;
  font-size: 16px;
  font-family: "FZLTZHJW";
}

//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .content {
    height: calc(100vh - #{formate-width($px: 176) + formate-width($px: 73)});
  }

  .footer {
    height: formate-width($px: 73);
    line-height: 19.4vw;
  }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .content {
    height: calc(100vh - #{formate-width($px: 176) + formate-width($px: 73)});
  }

  .footer {
    height: formate-width($px: 73);
    line-height: 19.4vw;
  }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .content {
    height: calc(100vh - #{formate-width($px: 176) + formate-width($px: 73)});
  }

  .footer {
    height: formate-width($px: 73);
    line-height: 19.4vw;
  }
}
</style>
