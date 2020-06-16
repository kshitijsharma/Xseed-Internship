<template>
  <div id="app">
    <el-card>
      <h3>
        Category:
        <input type="text" v-model="data.category">
      </h3>
      <h3>
        <div
          id="question"
        >Question &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Answer</div>
      </h3>

      <li v-for="i in data.opt" :key="i">
        <input type="text" v-on:click="addinput(i)" v-model="data.question[i-1]">&nbsp;
        <input type="text" v-on:click="addinput(i)" v-model="data.correct_answers[i-1]">
      </li>
      <br>
      <el-button type="success" v-on:click="add()">Add Question</el-button>&emsp;
      <el-button type="success" v-on:click="saveFile()">saveFile</el-button>&emsp;
      <el-button type="success" v-on:click="navigate()">Go to your Quiz page</el-button>
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
        type: "mtf",
        difficulty: "medium",
        question: [""],
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
        category: this.data.category,
        type: this.data.type,
        difficulty: this.data.difficulty,
        question: this.data.question,
        correct_answers: this.data.correct_answers,
        correct: this.data.correct
      });
      console.log(this.arr);
    },
    saveFile() {
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("arr", data);
      const obj = JSON.parse(window.localStorage.getItem("arr"));
      console.log(obj);
    },
    navigate() {
      this.$router.push("/quiz");
    },
    addinput(i) {
      if (this.data.opt === i) {
        this.data.opt = this.data.opt + 1;
      }
    }
  }
};
</script>

<style>
#question {
  padding: 20px;
  padding-left: 60px;
}
</style>