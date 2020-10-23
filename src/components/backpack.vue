<template>
  <div id="backpack">
    <img
      class="packup"
      :src="packupIcon"
      alt="load fail"
      @click="$emit('hide-backpack')"
    />
    <div class="res-list">
      <div
        class="res"
        v-for="res in resList"
        :key="res.propId"
        @click="checkRes = res"
      >
        <img :src="res.url" alt="load fail" v-if="!!res.url" />
        <div class="placeholder" v-else></div>
        <span>{{ res.name }}</span>
      </div>
    </div>
    <checkBackpack
      v-if="!!checkRes && showCheckRes"
      v-bind="checkRes"
      @close="showCheckRes = false"
    />
  </div>
</template>
<script>
import gameStorage from "@/utils/gameStorage.js";
import { getBackpack } from "@/api/index.js";
import checkBackpack from "./checkBackpack";
export default {
  name: "backpack",
  props: ["userId", "gameId", "backpackShow"],
  components: { checkBackpack },
  data() {
    return {
      game: {},
      packupIcon: require("@/assets/收起背包.png"),
      imgUrl: "",
      resList: [],
      checkRes: null,
      showCheckRes: false
    };
  },
  created() {
    this.game = gameStorage.get();
  },
  watch: {
    backpackShow() {
      if (this.backpackShow) {
        getBackpack(this.userId, this.gameId)
          .then(data => {
            data.forEach(d => {
              d.url = this.parseImgUrl(d.url);
            });
          })
          .catch(error => console.log(error));
      }
    }
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
#backpack {
  width: 100%;
  height: format-vw(236);
  background: linear-gradient(180deg, #000000 0%, #161616 54%, #000000 100%);
  opacity: 0.95;

  .packup {
    display: block;
    width: format-vw(20);
    height: format-vw(19);
    margin: format-vw(10) auto format-vw(21) auto;
  }

  .res-list {
    width: 100vw;
    height: format-vw(185);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .res {
      width: format-vw(50);
      height: fit-content;
      margin-bottom: format-vw(15);
      img,
      .placeholder {
        width: format-vw(50);
        height: format-vw(50);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .placeholder {
        background: rgba(0, 0, 0, 0.2);
      }

      span {
        display: block;
        width: format-vw(50);
        font-size: 10px;
        color: #ffffff;
        overflow-y: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: format-vw(10);
      }
    }
  }
}
</style>
