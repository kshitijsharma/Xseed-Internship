<template>
  <div id="app">
    <el-card>
      <table>
        <tr>
          <td colspan="2">
              <el-input style="width:150%" type="textarea" placeholder="Enter your question here" :autosize="{ minRows: 2}" v-model="data.question"/>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Options</h3>
          </td>
        </tr>
        <tr></tr>
        <tr v-for="i in data.opt" :key="i">
          <input name="answer" type="radio" v-on:click="answer(i)">
          <input type="text" v-on:input="addinput(i)" v-model="data.incorrect_answers[i-1]">
        </tr>
      </table>
      <br>
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
      window.localStorage.setItem("mcq", data);
      const obj = JSON.parse(window.localStorage.getItem("mcq"));
      console.log(obj);
    },
    answer(i) {
      this.data.correct_answer = this.data.incorrect_answers[i - 1];
    },
    addinput(i) {
      if(this.data.opt==i){
      this.data.opt = this.data.opt + 1;
      }
    }
  }
};
</script>
