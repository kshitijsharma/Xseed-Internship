<template>
  <div id="app">
    <el-card>
      <table>
        <tr>
          <td>
            <h3>Category:</h3>
          </td>
          <td>
            <h3>
              <el-input type="text" v-model="data.category"/>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Question:</h3>
          </td>
          <td>
            <h3>
              <el-input type="textarea" :autosize="{ minRows: 2}" v-model="data.question"/>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Options</h3>
          </td>
        </tr>
        <tr></tr>
        <tr v-for="i in data.opt" :key="i">
          <b>{{i}}.</b>
          <input type="text" v-on:click="addinput()" v-model="data.incorrect_answers[i-1]">
          <input type="radio" v-on:click="answer(i)">
        </tr>
      </table>
      <br>
      <br>
      <el-button type="primary" v-on:click="add()">Add Question</el-button>&emsp;
      <el-button type="primary" v-on:click="navigate()">Go to your Test page</el-button>
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
        category: "",
        type: "multiple",
        difficulty: "medium",
        question: "",
        correct_answer: "",
        incorrect_answers: [""]
      },
      arr: []
    };
  },

  methods: {
    add() {
      this.arr.push({
        category: this.data.category,
        type: this.data.type,
        difficulty: this.data.difficulty,
        question: this.data.question,
        correct_answer: this.data.correct_answer,
        incorrect_answers: this.data.incorrect_answers
      });
      console.log(this.arr);
      this.data.opt = 1;
      this.data.category = "";
      this.data.question = "";
      this.data.correct_answer = "";
      this.data.incorrect_answers = [""];
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("arr", data);
      const obj = JSON.parse(window.localStorage.getItem("arr"));
      console.log(obj);
    },
    navigate() {
      this.$router.push("/quiz");
    },
    answer(i) {
      this.data.correct_answer = this.data.incorrect_answers[i - 1];
    },
    addinput() {
      this.data.opt = this.data.opt + 1;
    }
  }
};
</script>
