<template>
  <div id="app" :style="setBackground">
    <div id="header" :class="{ show: headerAndFooterShow }" @click.stop>
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
      <gameDetail :gameId="gameId" />
      <div class="ceil" v-for="ceil in gameProcessShow" :key="ceil.key">
        <component
          :is="ceil.type"
          v-bind="ceil"
          @appSubmitCallback="appSubmitCallback"
          @appSubmitCallbackError="appSubmitCallbackError"
          @hint-cancel="gameProcessShow.pop()"
          @novelStopChooseCallback="novelStopChooseCallback"
        />
      </div>
      <div style="height:20vh;width:100vw"><!-- 底部占位 --></div>
    </div>
    <div id="footer" :class="{ show: headerAndFooterShow }" @click.stop>
      <img
        class="icon"
        :src="backpackIcon"
        alt="load fail"
        @click="backpackShow = !backpackShow"
      />
    </div>
    <backpack
      class="backpack"
      :class="{ show: backpackShow }"
      :userId="userId"
      :gameId="gameId"
      :backpackShow="backpackShow"
      @hide-backpack="backpackShow = false"
    />
    <bgm
      ref="music"
      :data-value="backgroundMusic.value"
      :data-switch="backgroundMusic.switch"
    />
  </div>
</template>

<script>
import { initGame, initGamewithNoGameData } from "@/api/index.js";
import defineComponent from "@/components/index.js";
import storage from "@/utils/storage.js";
import getParams from "@/utils/params.js";
import gameStorage from "@/utils/gameStorage.js";
import clone from "@/utils/clone.js";
import anime from "animejs";

export default {
  name: "game",
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
        switch: false,
        openIcon: require("@/assets/背景音乐开.png"),
        closeIcon: require("@/assets/背景音乐关.png"),
        icon: require("@/assets/背景音乐关.png"),
        value: null
      },
      hint: {
        value: {
          1: {
            text: "暂无提示"
          }
        },
        icon: require("@/assets/提示.png")
      },
      backgroundImage: require("@/assets/默认背景.png"),
      setBackground: {
        backgroundImage: ""
      },
      canPopComponentType: [
        "setPaintingTalk",
        "chooseSetPaintingTalk",
        "mutiChooseSetPaintingTalk",
        "inputSetPaintingTalk",
        "richTextAlert",
        "getBackpackAlert"
      ],
      backpackShow: false,
      keyCount: 0
    };
  },
  components: {
    ...defineComponent
  },
  created() {
    this.setBackground.backgroundImage = `url(${this.backgroundImage})`;
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
          // console.log(d);
          this.totalDataHandler(d.userGame.totalData);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      initGame(this.userId, this.gameId)
        .then(d => {
          // console.log(d);
          this.game = d.game;
          this.gameModules = this.game.data.modules;
          this.totalDataHandler(d.userGame.totalData);
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
      this.backpackShow = false;
      if (
        !this.gameProcess ||
        !Array.isArray(this.gameProcess) ||
        this.gameProcess.length === 0
      )
        return;
      this.removeParser();
      // index索引到了最后一个就不再往下推了
      if (this.gameProcessIndex === this.gameProcess.length) return;
      // 遇到小说试玩结束卡点就不再继续推进游戏
      if (
        this.gameProcessIndex !== 0 &&
        this.gameProcess[this.gameProcessIndex - 1].type === "toApp"
      )
        return;
      this.gameProcessShowHandler();
    },
    // 将gameProcess中的数据推入gameProcessShow中
    gameProcessShowHandler() {
      let currentModule = this.gameProcess[this.gameProcessIndex];
      this.gameProcessIndex++;
      let type = currentModule.type;
      // 设置背景音乐音效
      this.backgroundMusic.value = currentModule;
      switch (type) {
        case "chapter":
          // 背景图片设置
          if (currentModule.backgroundImage) {
            this.setBackground.backgroundImage = `url(${this.parseImgUrl(
              currentModule.backgroundImage
            )})`;
          }
          return;
        case "hint":
          // 提示设置
          this.hint.value = currentModule.value;
          return;
        case "getBackpackAlert":
          if (
            currentModule.attachment[0].key.indexOf("prop") === -1 &&
            currentModule.attachment[0].key.indexOf("image") === -1
          )
            return;
          break;
        case "undefinedComponent":
          // 跳过未知类型的组件
          return;
        default:
          break;
      }
      this.gameProcessShow.push(currentModule);
      this.addAnimation();
    },
    // 渲染用户历史数据
    playGameHistory() {
      let gameprocessTemp = [];
      for (let currentModule of this.gameProcess) {
        let type = currentModule.type;
        if (type === "chapter") {
          // 背景图片设置
          if (currentModule.backgroundImage) {
            this.setBackground.backgroundImage = `url(${this.parseImgUrl(
              currentModule.backgroundImage
            )})`;
          }
          // 背景音乐设置
          this.backgroundMusic.value = currentModule;
          continue;
        }
        if (type === "getBackpackAlert") continue;
        if (type === "hint") {
          this.hint.value = currentModule.value;
          continue;
        }
        if (type === "novelStopChoose") currentModule.needSubmit = "cancel";
        if (type === "undefinedComponent") continue;
        if (type === "DemoMainTaskFinished") break;
        gameprocessTemp.push(currentModule);
      }
      this.gameProcessShow = gameprocessTemp;
      const ceil = this.$refs.ceil;
      this.$nextTick(() => {
        ceil.scrollTop = ceil.scrollHeight - ceil.clientHeight;
      });
      this.gameProcessIndex = this.gameProcess.length;
    },
    // module解析器
    moduleParser(currentProcess) {
      let id = currentProcess.id;
      const type = this.gameModules[id].type;
      const currentModule = clone(this.gameModules[id]);
      switch (type) {
        case "chapter":
          break;
        case "richText":
          if (currentModule.name === "system")
            currentModule.type = "richTextAlert";
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
          if (!currentModule.speaker) {
            currentModule.speaker = "player_default";
            currentModule.nameHeadIndex = "0";
            currentModule.nameIndex = 0;
          }
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
          if (typeof currentProcess.value === "string")
            currentModule.checkedV = currentProcess.value;
          else currentModule.checkedV = null;
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
        case "gif":
          currentModule.type = "defineImage";
          break;
        case "audio":
          currentModule.type = "defineAudio";
          break;
        case "video":
          currentModule.type = "defineVideo";
          break;
        case "popupNewWindow":
          break;
        case "hint":
          break;
        case "novelStopChoose":
          currentModule.userId = this.userId;
          currentModule.gameId = this.gameId;
          break;
        case "award":
          currentModule.type = "getBackpackAlert";
          break;
        case "hotImage":
          currentModule.type = "hotImage";
          break;
        case "DemoMainTaskFinished":
          currentModule.type = "toApp";
          currentModule.gameId = this.gameId;
          console.log("游戏试玩结束");
          break;
        case "end":
          currentModule.type = "toApp";
          currentModule.gameId = this.gameId;
          console.log("到达游戏结局");
          break;
        default:
          currentModule.type = "undefinedComponent";
          console.log(`未知类型:${type}`);
          break;
      }
      this.keyCount++;
      currentModule.key = currentModule.moduleId + "-" + this.keyCount;
      return currentModule;
    },
    // 对立绘等组件组移除处理
    removeParser() {
      if (this.gameProcessShow.length === 0) return;
      let { type } = this.gameProcessShow[this.gameProcessShow.length - 1];
      if (this.canPopComponentType.indexOf(type) !== -1)
        this.gameProcessShow.pop();
    },
    appSubmitCallback(data) {
      if (!data || data.length === 0) return;
      this.gameProcessIndex = 0;
      this.gameProcess = data.map(this.moduleParser);
      this.playGame();
    },
    appSubmitCallbackError(data) {
      this.gameProcessShow.push(data);
    },
    novelStopChooseCallback(data) {
      if (!data || data.length === 0) return;
      this.gameProcessIndex = 0;
      this.gameProcess = data.map(this.moduleParser);
    },
    // 组件添加动画，滑倒底部
    addAnimation() {
      const ceil = this.$refs.ceil;
      this.$nextTick(() => {
        anime({
          targets: "#container",
          scrollTop: ceil.scrollHeight - ceil.clientHeight,
          easing: "easeInOutExpo",
          duration: 1000
        });
      });
    },
    hintHandler() {
      if (!this.hint.value) return;
      this.gameProcessShow.push({
        type: "hint",
        key: "hint",
        value: this.hint.value
      });
    },
    backgroundMusicHandler() {
      this.backgroundMusic.switch = !this.backgroundMusic.switch;
      if (this.backgroundMusic.switch) {
        this.backgroundMusic.icon = this.backgroundMusic.openIcon;
        this.$refs.music.play();
      } else {
        this.backgroundMusic.icon = this.backgroundMusic.closeIcon;
        this.$refs.music.pause();
      }
    },
    parseImgUrl(str) {
      let resourcePrefix = this.game.others.resourcePrefix;
      let name = this.game.others.resources[str].name;
      return resourcePrefix + name;
    },
    //totalData处理函数，解析用户记录和删除特定类型的组件
    //数据转换
    totalDataHandler(totalData) {
      if (!totalData || !Array.isArray(totalData)) return;
      let needPlayGameHistory = false;
      // 用户有游戏记录，直接渲染到最后
      if (totalData.filter(d => d.type === "stop").length > 1)
        needPlayGameHistory = true;
      totalData = totalData.filter(
        (d, index) => index === totalData.length - 1 || d.type !== "stop"
      );
      this.gameProcess = totalData.map(this.moduleParser);
      if (needPlayGameHistory) {
        // 过滤类似弹出的组件记录
        this.gameProcess = this.gameProcess.filter(
          (d, index) =>
            index === this.gameProcess.length - 1 ||
            this.canPopComponentType.indexOf(d.type) === -1
        );
        this.playGameHistory();
      }
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
  background-position: center;
  background-size: cover;
}

#container {
  width: 100vw;
  height: 100%;
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
    padding: format-vw(7.5) format-vw(20) format-vw(7.5) 0;
  }

  &.show {
    top: 0px;
  }
}

#footer {
  height: format-vw(52);
  bottom: -#{format-vw(52)};
  transition: bottom 500ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  img {
    width: format-vw(28);
    height: format-vw(40);
  }

  &.show {
    bottom: 0px;
  }
}

.cail {
  width: 100wv;
}

.backpack {
  position: fixed;
  bottom: -#{format-vw(236)};
  transition: bottom 500ms ease;

  &.show {
    bottom: format-vw(52);
  }
}
</style>
