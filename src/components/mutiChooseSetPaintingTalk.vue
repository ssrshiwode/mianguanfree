<template>
  <div id="mutiChooseSetPaintingTalk">
    <div class="shady"></div>
    <div class="content">
      <img
        class="paint"
        src="https://resource.itaotuo.com/007581c467fde968ea354bb2280f2e46.jpg"
        alt="load fail"
      />
      <div class="talk">
        <mutiChoose value="123"></mutiChoose>
      </div>
    </div>
  </div>
</template>
<script>
import mutiChoose from "./mutiChoose";
export default {
  name: "mutiChooseSetPaintingTalk",
  components: {
    mutiChoose
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#mutiChooseSetPaintingTalk {
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

  .content {
    position: absolute;
    left: format-vw(15);
    right: format-vw(15);
    bottom: format-vw(92);
    display: flex;
    flex-direction: column;

    .paint {
      width: format-vw(240);
      height: format-vw(240);
    }

    .talk {
      width: format-vw(345);
      background: #131312;
      border-radius: 2px;
    }
  }
}
</style>
