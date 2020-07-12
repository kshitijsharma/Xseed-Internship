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
            <h3>Options:</h3>
          </td>
        </tr>
        <el-radio-group v-model="data.correct_answer">
          <tr v-for="i in 2" :key="i">
            <el-radio name="i" :label="i">
              <b>{{data.incorrect_answers[i-1]}}</b>
            </el-radio>
          </tr>
        </el-radio-group>
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
        opt: 2,
        category: "",
        type: "multiple",
        difficulty: "medium",
        question: "",
        correct_answer: "",
        incorrect_answers: ["TRUE", "FALSE"]
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
      this.data.incorrect_answers = ["TRUE", "FALSE"];
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("arr", data);
      const obj = JSON.parse(window.localStorage.getItem("arr"));
      console.log(obj);
    },
    navigate() {
      this.$router.push("/quiz");
    },

    addinput() {
      this.data.opt = this.data.opt + 1;
    }
  }
};
</script>
