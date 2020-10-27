<template>
  <div id="hint" @click.stop>
    <div class="shady" @click="$emit('hint-cancel')"></div>
    <div class="main">
      <p class="title">提示</p>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-if="!!value['1']">
            {{ this.value["1"].text }}
          </div>
          <div class="swiper-slide" v-if="!!value['2']">
            {{ this.value["2"].text }}
          </div>
          <div class="swiper-slide" v-if="!!value['3'] && lock">
            {{ this.value["3"].text }}
          </div>
          <div
            class="swiper-slide"
            v-if="!!value['3'] && !lock"
            style="overflow:visible"
          >
            <p>第三条提示涉及剧透，可能会影响您的游戏体验，是否继续查看？</p>
            <div class="button-list">
              <button>否</button>
              <button @click="lock = true">是</button>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "hint",
  props: ["value"],
  data() {
    return {
      lock: false
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      // direction: "horizontal",
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#hint {
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

  .main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: format-vw(295);
    height: format-vw(183);
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;

    .title {
      height: format-vw(54);
      line-height: format-vw(54);
      text-align: center;
      font-size: 14px;
      letter-spacing: 0.35px;
    }

    .swiper-container {
      height: format-vw(129);
    }

    .swiper-slide {
      box-sizing: border-box;
      padding: 0 format-vw(18);
      height: format-vw(72);
      overflow-y: auto;
      letter-spacing: 0.3px;
      line-height: 18px;
      font-size: 12px;

      .button-list {
        display: flex;
        justify-content: space-around;
        margin-top: format-vw(10);

        button {
          width: format-vw(73);
          height: format-vw(34);
          text-align: center;
          line-height: format-vw(34);

          &:first-of-type {
            background: #000000;
            border: 1px solid #c08942;
            color: #c08942;
          }

          &:last-of-type {
            background: #c08942;
            color: #ffffff;
          }
        }
      }
    }

    .swiper-pagination {
      bottom: format-vw(15);
    }
  }
}
</style>
