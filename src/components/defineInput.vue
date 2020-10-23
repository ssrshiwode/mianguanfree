<template>
  <div id="defineInput">
    <input
      type="text"
      placeholder="点击输入答案"
      @keyup.enter="submit"
      v-model="answer"
      :disabled="isAnswer"
    />
  </div>
</template>
<script>
import { appSubmit } from "@/api/index.js";
export default {
  name: "defineInput",
  props: [
    "errorModule",
    "errorValue",
    "hint",
    "userId",
    "gameId",
    "moduleId",
    "value"
  ],
  data() {
    return {
      answer: "",
      isAnswer: false
    };
  },
  mounted() {
    if (this.value) {
      this.isAnswer = true;
      this.answer = this.value;
    }
  },
  methods: {
    async submit() {
      try {
        let result = await appSubmit(
          this.userId,
          this.gameId,
          this.moduleId,
          this.answer
        );
        let data = [];
        if (result.data && Array.isArray(result.data))
          data = result.data.filter(d => !d.passed);
        this.$emit("appSubmitCallback", data);
        this.isAnswer = true;
      } catch (error) {
        console.log(error);
        if (this.errorValue && this.errorModule.speaker)
          this.$emit("appSubmitCallbackError", {
            type: this.errorModule.type,
            speaker: this.errorModule.speaker,
            nameHeadIndex: this.errorModule.nameHeadIndex,
            nameIndex: this.errorModule.nameIndex,
            value: this.errorValue,
            key: "error-alert-" + Date.now()
          });
        if (this.errorValue && !this.errorModule.speaker)
          this.$emit("appSubmitCallbackError", {
            type: this.errorModule.type,
            speaker: "player_default",
            nameHeadIndex: "0",
            nameIndex: 0,
            value: this.errorValue,
            key: "error-alert-" + Date.now()
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#defineInput {
  width: 100%;

  input {
    display: block;
    width: format-vw(262);
    height: format-vw(50);
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    line-height: format-vw(50);
    background: #3b3b3b;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.32);
    border-radius: 5px;
    border: 1px solid #4c4c4c;
    outline: none;
    margin: $marginCol auto;
    letter-spacing: 0.35px;
  }
}
</style>
