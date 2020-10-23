<template>
  <div id="download">
    <img src="@/assets/download.jpg" alt="加载失败" />
    <a href="https://game.itaotuo.com/install.html">
      立即下载
    </a>
  </div>
</template>

<script>
export default {
  name: "Download"
};
</script>

<style lang="scss" scoped>
#download {
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: 78.6vw;
    height: 50px;
    color: #000;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    font-size: 21px;
    background-color: #dca354;
    letter-spacing: 0.52px;
  }
}
</style>
