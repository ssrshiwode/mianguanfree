<template>
  <div id="defineChoose">
    <template v-for="(answer, question) in value">
      <label :key="answer">
        <input
          type="radio"
          :value="question"
          v-model="checkedValue"
          :disabled="isAnswer"
        />
        <span>{{ question }}</span>
      </label>
    </template>
  </div>
</template>
<script>
import { appSubmit } from "@/api/index.js";
export default {
  name: "defineChoose",
  props: ["value", "userId", "gameId", "moduleId", "checkedV"],
  data() {
    return {
      checkedValue: "",
      isAnswer: false
    };
  },
  created() {
    if (this.checkedV) {
      this.isAnswer = true;
      this.checkedValue = Object.keys(this.value)[parseInt(this.checkedV)];
    }
  },
  watch: {
    async checkedValue() {
      if (this.isAnswer) return;
      try {
        let chooseAnswer = 0;
        for (let i = 0; i < Object.keys(this.value).length; i++) {
          if (Object.keys(this.value)[i] === this.checkedValue) {
            chooseAnswer = i;
            break;
          }
        }
        let result = await appSubmit(
          this.userId,
          this.gameId,
          this.moduleId,
          chooseAnswer
        );
        let data = [];
        if (result.data && Array.isArray(result.data))
          data = result.data.filter(d => !d.passed);
        this.$emit("appSubmitCallback", data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/util.scss";
#defineChoose {
  width: 100%;

  label {
    display: block;

    input {
      display: none;
    }

    span {
      display: block;
      width: format-vw(262);
      // height: format-vw(50);
      margin: $marginCol auto;
      background: #3b3b3b;
      border-radius: 5px;
      border: 1px solid #4c4c4c;
      font-size: 16px;
      color: #999999;
      letter-spacing: 0.4px;
      text-align: center;
      line-height: format-vw(50);
    }

    input:checked + span {
      background: #ffca00;
      color: #3b3122;
    }
  }
}
</style>
