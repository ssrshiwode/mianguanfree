<template>
  <div id="defineAudio">
    <audio
      class="normal-audio"
      src="https://resource.itaotuo.com/chinatown/audio/001.mp3"
      controls
      preload
    >
      加载失败
    </audio>
    <div class="npc">
      <div class="left">
        <img src="https://resource.itaotuo.com/logo.png" alt="load fail" />
      </div>
      <div class="right">
        <p>阿拉蕾</p>
        <audio
          src="https://resource.itaotuo.com/chinatown/audio/001.mp3"
          controls
          preload
        >
          加载失败
        </audio>
      </div>
    </div>
    <div class="host">
      <div class="left">
        <img src="https://resource.itaotuo.com/logo.png" alt="load fail" />
      </div>
      <div class="right">
        <p>六六</p>
        <audio
          src="https://resource.itaotuo.com/chinatown/audio/001.mp3"
          controls
          preload
        >
          加载失败
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "defineAudio"
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
