<template>
  <div id="app">
    <el-card>
      <table>
        <tr>
          <td colspan="2">
            <el-input type="textarea" style="width:100%" :autosize="{ minRows: 2}" placeholder="Enter your Question here" v-model="data.question"/>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Options in Correct order</h3>
          </td>
        </tr>
        <tr v-for="i in data.opt" :key="i">
          <td>
            <textarea
              v-on:input="addinput(i)"
              style="width:100%"
              v-model="data.correct_answers[i-1]"
            />
          </td>
        </tr>
      </table>
      <br>
      <el-button type="primary" v-on:click="add()">Add Question</el-button>&emsp;
    </el-card>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: {
        opt: 1,
        type: "mtf",
        difficulty: "medium",
        question: "",
        correct_answers: [""],
        correct: [""]
      },
      arr: []
    };
  },

  methods: {
    add() {
      for (var i = 0; i < this.data.opt; i++) {
        this.data.correct[i] = this.data.correct_answers[i];
      }
      this.arr.push({
        type: this.data.type,
        difficulty: this.data.difficulty,
        question: this.data.question,
        correct_answers: this.data.correct_answers,
        correct: this.data.correct
      });
      this.data.opt = 1;
      this.data.question = "";
      this.data.correct_answers = [""];
      this.data.correct = [""];
      console.log(this.arr);
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("sen", data);
      const obj = JSON.parse(window.localStorage.getItem("sen"));
      console.log(obj);
    },
    navigate() {
      this.$router.push("/test");
    },
    addinput(i) {
      if (this.data.correct_answers[i] !== "") {
        if (this.data.opt === i) {
          this.data.opt = this.data.opt + 1;
        }
      }
    }
  }
};
</script>

