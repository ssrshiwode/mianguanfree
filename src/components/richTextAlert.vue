<template>
  <div id="richTextAlert">
    <p v-html="richText"></p>
  </div>
</template>

<script>
import RTParser from "@/utils/RTParser.js";
export default {
  name: "richTextAlert",
  props: ["value"],
  data() {
    return {
      richText: null
    };
  },
  created() {
    this.richText = RTParser(this.value);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/style/util.scss";
#richTextAlert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 2px;
    word-break: break-word;
  }
}
</style>
