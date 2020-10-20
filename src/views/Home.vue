<template>
  <div id="app">
    <div id="header" :class="{ show: headerAndFooterShow }">
      <img :src="hint.icon" alt="load fail" @click="hintHandler()" />
      <img
        :src="backgroundMusic.icon"
        alt="load fail"
        @click="backgroundMusicHandler()"
      />
    </div>
    <div
      id="container"
      @touchstart="touchstart($event)"
      @touchmove="touchmove($event)"
      @click="playGame()"
      ref="ceil"
    >
      <div class="ceil" v-for="ceil in gameProcessShow" :key="ceil.key">
        <component
          :is="ceil.type"
          v-bind="ceil"
          @appSubmitCallback="appSubmitCallback"
        />
      </div>
    </div>
    <div id="footer" :class="{ show: headerAndFooterShow }">
      <img :src="backpackIcon" alt="load fail" />
    </div>
  </div>
</template>

<script>
import { initGame, initGamewithNoGameData } from "@/api/index.js";
import defineComponent from "@/components/index.js";
import storage from "@/utils/storage.js";
import getParams from "@/utils/params.js";
import gameStorage from "@/utils/gameStorage.js";
import clone from "@/utils/clone.js";

export default {
  data() {
    return {
      game: {},
      gameModules: {},
      gameProcess: [],
      gameProcessIndex: 0,
      gameProcessShow: [],
      userId: "",
      gameId: "",
      touchRecord: 0,
      headerAndFooterShow: false,
      backpackIcon: require("@/assets/背包.png"),
      backgroundMusic: {
        switch: true,
        openIcon: require("@/assets/背景音乐开.png"),
        closeIcon: require("@/assets/背景音乐关.png"),
        icon: require("@/assets/背景音乐开.png")
      },
      hint: {
        switch: false,
        icon: require("@/assets/提示.png")
      },
      appSubmit: {
        isSubmit: false,
        response: ""
      }
    };
  },
  components: {
    ...defineComponent
  },
  created() {
    if (!storage.get("userId")) {
      this.userId =
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(3, length);
      storage.set("userId", this.userId);
    } else this.userId = storage.get("userId");

    this.gameId = getParams("gameId");

    if (!this.gameId) console.log("gameId is not defined!");
    else if (this.gameId === storage.get("gameId")) {
      // 如果localstorage有数据则不再从服务器拉去游戏数据
      this.game = JSON.parse(storage.get("game"));
      gameStorage.set(this.game);
      this.gameModules = this.game.data.modules;
      initGamewithNoGameData(this.userId, this.gameId)
        .then(d => {
          console.log(d);
          if (d.userGame.totalData || Array.isArray(d.userGame.totalData))
            this.gameProcess = d.userGame.totalData.filter(
              d => d.type !== "inputSetPaintingTalk"
            );
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      initGame(this.userId, this.gameId)
        .then(d => {
          console.log(d);
          this.game = d.game;
          if (d.userGame.totalData || Array.isArray(d.userGame.totalData))
            this.gameProcess = d.userGame.totalData.filter(
              d.type !== "inputSetPaintingTalk"
            );
          this.gameModules = this.game.data.modules;
          gameStorage.set(this.game);
          storage.set("gameId", this.gameId);
          storage.set("game", JSON.stringify(d.game));
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  methods: {
    touchstart(e) {
      this.touchRecord = e.touches[0].pageY;
    },
    touchmove(e) {
      if (e.touches[0].pageY - this.touchRecord > 10)
        this.headerAndFooterShow = true;
      if (e.touches[0].pageY - this.touchRecord < -10)
        this.headerAndFooterShow = false;
      this.touchRecord = e.touches[0].pageY;
    },
    // 推进游戏流程
    playGame() {
      this.headerAndFooterShow = false;
      if (
        !this.gameProcess ||
        !Array.isArray(this.gameProcess) ||
        this.gameProcess.length === 0
      )
        return;
      // index索引到了最后一个就不再往下推了
      if (this.gameProcessIndex === this.gameProcess.length) return;
      let currentProcess = this.gameProcess[this.gameProcessIndex];
      // 对type为stop做跳过处理
      if (
        currentProcess.type &&
        currentProcess.type === "stop" &&
        this.gameProcessIndex !== this.gameProcess.length - 1
      ) {
        this.gameProcessIndex++;
        currentProcess = this.gameProcess[this.gameProcessIndex];
      }
      // 遇到答案提交并且未提交答案时停止推进游戏流程
      if (this.appSubmitHandler() === "fail") return;
      this.removeParser();
      this.moduleParser(currentProcess);
      this.addAnimation();
      this.gameProcessIndex++;
    },
    // module解析器
    moduleParser(currentProcess) {
      let id = currentProcess.id;
      const type = this.gameModules[id].type;
      const currentModule = clone(this.gameModules[id]);
      switch (type) {
        case "chapter":
          return;
        case "richText":
          break;
        case "input":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          currentModule.type = "defineInput";
          if (typeof currentProcess.value === "string")
            currentModule.value = currentProcess.value;
          else currentModule.value = null;
          break;
        case "inputSetPaintingTalk":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          break;
        case "setPaintingTalk":
          currentModule.type = "setPaintingTalk";
          break;
        case "choose":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          currentModule.type = "defineChoose";
          if (typeof currentProcess.value === "string")
            currentModule.checkedV = currentProcess.value;
          else currentModule.checkedV = null;
          break;
        case "mutiChoose":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          break;
        case "chooseSetPaintingTalk":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          break;
        case "talk":
          break;
        case "image":
          currentModule.type = "defineImage";
          break;
        default:
          console.log(`未知类型:${type}`);
          return;
      }
      currentModule.key = currentModule.moduleId + "-" + Date.now();
      this.gameProcessShow.push(currentModule);
    },
    // 对立绘等组件组移除处理
    removeParser() {
      if (this.gameProcessShow.length === 0) return;
      let { type } = this.gameProcessShow[this.gameProcessShow.length - 1];
      switch (type) {
        case "setPaintingTalk":
          this.gameProcessShow.pop();
          break;
        case "chooseSetPaintingTalk":
          this.gameProcessShow.pop();
          break;
        case "inputSetPaintingTalk":
          this.gameProcessShow.pop();
          break;
        default:
          break;
      }
    },
    // 答案提交相关组件处理
    // success:已成功 fail:未提交 notSubmit:还没遇到答案提交
    appSubmitHandler() {
      if (this.gameProcessShow.length === 0) return;
      let { type } = this.gameProcessShow[this.gameProcessShow.length - 1];
      switch (type) {
        case "input":
          if (this.appSubmit.isSubmit) return "success";
          else return "fail";
        default:
          this.appSubmit.isSubmit = false;
      }
    },
    appSubmitCallback(data) {
      this.appSubmit.isSubmit = true;
      this.gameProcessIndex = 0;
      this.gameProcess = data;
      this.removeParser();
      this.playGame();
    },
    // 组件添加动画，滑倒底部
    addAnimation() {
      const ceil = this.$refs.ceil;
      this.$nextTick(() => {
        const afterScrollHeight = ceil.scrollHeight;
        ceil.scrollTop = afterScrollHeight;
      });
    },
    hintHandler() {},
    backgroundMusicHandler() {
      this.backgroundMusic.switch = !this.backgroundMusic.switch;
      this.backgroundMusic.switch
        ? (this.backgroundMusic.icon = this.backgroundMusic.openIcon)
        : (this.backgroundMusic.icon = this.backgroundMusic.closeIcon);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-image: url("https://resource.itaotuo.com/puzzle/games/D51IQC0@00332/backgroundimg.png");
  background-position: center;
  background-size: cover;
}

#container {
  width: 100vw;
  height: 70vh;
  padding: 10vh 0 20vh 0;
  overflow-y: auto;
}

#header,
#footer {
  position: absolute;
  width: 100vw;
  background: #0a0a0b;
}

#header {
  height: format-vw(39);
  top: -#{format-vw(39)};
  transition: top 500ms ease;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  img {
    width: format-vw(24);
    height: format-vw(24);
    margin-right: format-vw(20);
  }
}

#header.show {
  top: 0px;
}

#footer {
  height: format-vw(52);
  bottom: -#{format-vw(52)};
  transition: bottom 500ms ease;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: format-vw(28);
    height: format-vw(40);
  }
}

#footer.show {
  bottom: 0px;
}

.cail {
  width: 100wv;
}
</style>
