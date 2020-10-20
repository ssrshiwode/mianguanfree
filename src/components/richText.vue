<template>
  <div id="richText">
    <p>{{ this.value }}</p>
  </div>
</template>

<script>
export default {
  name: "richText",
  props: ["value"],
  data() {
    return {};
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
