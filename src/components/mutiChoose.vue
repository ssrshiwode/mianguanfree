<template>
  <div id="mutiChoose" @click.stop>
    <template v-for="question in keys">
      <div :key="question" class="checkbox">
        <span class="context">{{ question }}</span>
        <label>
          <input
            type="checkbox"
            :value="question"
            v-model="checkedValue"
            :disabled="isAnswer"
          />
          <span></span>
        </label>
      </div>
    </template>
    <button @click="submit()" :disabled="isAnswer">提交</button>
  </div>
</template>
<script>
import { appSubmit } from "@/api/index.js";
export default {
  name: "mutiChoose",
  props: ["keys", "moduleId", "userId", "gameId", "checkedV"],
  data() {
    return {
      checkedValue: [],
      isAnswer: false
    };
  },
  created() {
    if (this.checkedV) {
      this.isAnswer = true;
      for (let v of this.checkedV.split(",")) {
        this.checkedValue.push(this.keys[parseInt(v)]);
      }
    }
  },
  methods: {
    async submit() {
      try {
        let chooseAnswer = [];
        for (let v of this.checkedValue) {
          chooseAnswer.push(this.keys.indexOf(v));
        }
        chooseAnswer.sort();
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
#mutiChoose {
  width: 100%;

  .checkbox {
    width: format-vw(262);
    height: format-vw(50);
    background: #3b3b3b;
    border: 1px solid #4c4c4c;
    border-radius: 5px;
    margin: $marginCol auto;
    padding: 0 format-vw(15) 0 format-vw(20);
    display: flex;
    align-items: center;

    .context {
      display: inline-block;
      width: format-vw(227);
      white-space: nowrap;
      overflow-y: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
      font-size: 16px;
      letter-spacing: 0.4px;
    }

    label {
      display: inline-block;
      width: format-vw(18);
      height: format-vw(18);

      input {
        display: none;
      }

      span {
        display: inline-block;
        width: format-vw(18);
        height: format-vw(18);
        background: url("~@/assets/多选未选中.png");
        background-size: format-vw(18);
      }

      input:checked + span {
        background: url("~@/assets/多选选中.png");
        background-size: format-vw(18);
      }
    }
  }

  button {
    width: format-vw(262);
    height: format-vw(40);
    display: block;
    border: none;
    border-radius: 4px;
    background: #ffca00;
    margin: $marginCol auto;
    color: #333333;
    font-size: 14px;
    letter-spacing: 0.35px;
    text-align: center;
    line-height: format-vw(40);
  }
}
</style>
