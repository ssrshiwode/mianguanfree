<template>
  <div id="defineVideo">
    <video
      class="normal-video"
      src="https://resource.itaotuo.com/gugong2/videos/Introduction.mp4"
      controls
      preload
    >
      加载失败
    </video>
    <div class="npc">
      <div class="left">
        <img src="https://resource.itaotuo.com/logo.png" alt="load fail" />
      </div>
      <div class="right">
        <p>阿拉蕾</p>
        <video
          src="https://resource.itaotuo.com/gugong2/videos/Introduction.mp4"
          controls
          preload
        >
          加载失败
        </video>
      </div>
    </div>
    <div class="host">
      <div class="left">
        <img src="https://resource.itaotuo.com/logo.png" alt="load fail" />
      </div>
      <div class="right">
        <p>六六</p>
        <video
          src="https://resource.itaotuo.com/gugong2/videos/Introduction.mp4"
          controls
          preload
        >
          加载失败
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "defineVideo"
};
</script>

<style lang="scss" scoped>
@import "@/style/util.scss";
#defineVideo {
  width: 100%;

  .normal-video {
    display: block;
    width: format-vw(335);
    height: format-vw(201);
    margin: format-vw(20) auto;
    border: 1px solid #ffffff;
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
      video {
        width: format-vw(202);
        height: format-vw(142);
        border: 1px solid #ffffff;
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
      video {
        width: format-vw(202);
        height: format-vw(142);
        border: 1px solid #ffffff;
      }
    }
  }
}
</style>
