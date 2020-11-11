<template>
  <div>
    <audio ref="bgm" :src="bgm.src" preload @ended="endedBgm()"></audio>
    <audio
      ref="effect"
      :src="effect.src"
      preload
      @ended="endedEffect()"
    ></audio>
  </div>
</template>

<script>
import gameStorage from "@/utils/gameStorage.js";
export default {
  name: "bgm",
  props: ["dataValue", "dataSwitch"],
  data() {
    return {
      game: null,
      bgm: {
        src: "",
        loopTimes: 99
      },
      effect: {
        src: "",
        loopTimes: 99
      }
    };
  },
  watch: {
    dataValue() {
      if (!this.game) this.game = gameStorage.get();
      if (!this.dataValue) return;
      if (this.dataValue.type === "chapter") {
        const moduleId = this.dataValue.moduleId;
        if (
          !this.game.data ||
          !this.game.data.config ||
          !this.game.data.config.CATALOG ||
          !Array.isArray(this.game.data.config.CATALOG)
        )
          return;
        const currentModule = this.game.data.config.CATALOG.filter(
          d => d.moduleId === moduleId
        );
        if (currentModule[0] && currentModule[0].backgroundMusic) {
          this.bgm.src = this.parseAudioUrl(
            this.game.data.config.CATALOG[0].backgroundMusic
          );
          this.$nextTick(() => {
            if (this.dataSwitch) this.$refs.bgm.play();
          });
          return;
        }
        if (
          this.game.data &&
          this.game.data.config &&
          this.game.data.config.MUSIC &&
          this.game.data.config.MUSIC.BGM
        ) {
          this.bgm.src = this.game.data.config.MUSIC.BGM;
          this.$nextTick(() => {
            if (this.dataSwitch) this.$refs.bgm.play();
          });
        }
      } else {
        if (
          !this.dataValue.event ||
          !this.dataValue.event.onEnterCenter ||
          !this.dataValue.event.onEnterCenter.effect ||
          !Array.isArray(this.dataValue.event.onEnterCenter.effect) ||
          this.dataValue.event.onEnterCenter.effect.length === 0
        )
          return;
        for (let { eventEffectType, isLoopTimes, value } of this.dataValue.event
          .onEnterCenter.effect) {
          if (eventEffectType === "playBGM") {
            this.bgm.loopTimes = isLoopTimes;
            this.bgm.src = this.parseAudioUrl(value);
            this.$nextTick(() => {
              if (this.dataSwitch) this.$refs.bgm.play();
            });
          }
          if (eventEffectType === "playEffect") {
            this.effect.loopTimes = isLoopTimes;
            this.effect.src = this.parseAudioUrl(value);
            this.$nextTick(() => {
              if (this.dataSwitch) this.$refs.effect.play();
            });
          }
        }
      }
    }
  },
  methods: {
    pause() {
      if (this.bgm.src) this.$refs.bgm.pause();
      if (this.effect.src) this.$refs.effect.pause();
    },
    play() {
      if (this.bgm.src) this.$refs.bgm.play();
      if (this.effect.src) this.$refs.effect.play();
    },
    parseAudioUrl(str) {
      let resourcePrefix = this.game.others.resourcePrefix;
      let name = this.game.others.resources[str].name;
      return resourcePrefix + name;
    },
    endedBgm() {
      if (this.bgm.loopTimes > 1) {
        this.bgm.loopTimes -= 1;
        this.$refs.bgm.play();
      }
    },
    endedEffect() {
      if (this.effect.loopTimes > 1) {
        this.effect.loopTimes -= 1;
        this.$refs.effect.play();
      }
    }
  }
};
</script>
