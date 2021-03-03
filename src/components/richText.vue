<template>
  <div id="richText">
    <p v-html="this.richText"></p>
  </div>
</template>

<script>
import RTParser from "@/utils/RTParser.js";
export default {
  name: "richText",
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
#richText {
  width: 100%;
  font-size: 18px;
  p {
    color: #ffffff;
    line-height: 34px;
    letter-spacing: 2px;
    text-align: justify;
    margin: $marginCol format-vw(25);
    word-break: break-word;
  }
}
</style>
