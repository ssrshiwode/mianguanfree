<template>
  <div id="gameDetail">
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
  </div>
</template>
<script>
import score from "@/components/score.vue";
import { getGameDetail } from "@/api/index.js";
export default {
  name: "gameDetail",
  props: ["gameId"],
  data() {
    return {
      game: {
        gameName: "",
        subtitle: "",
        desc: "",
        coverImage: "",
        scoreAverage: "",
        playerCount: 0,
        themes: []
      }
    };
  },
  components: {
    score
  },
  created() {
    getGameDetail(this.gameId)
      .then(data => {
        this.game = data.game;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#gameDetail {
  width: 100%;

  .header {
    position: relative;
    margin: $marginCol 0;
    height: format-vw(176);
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
        //font-family: "FZLTXHJW", sans-serif;
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
          //font-family: "FZLTXHJW", sans-serif;
          padding-left: 6.1vw;
        }
      }
    }
  }
}
</style>
